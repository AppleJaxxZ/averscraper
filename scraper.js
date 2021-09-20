const puppeteer = require("puppeteer");
const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const request = require("request-promise-native").defaults({ Jar: true });
const poll = require("promise-poller").default;
app.use(morgan("combined"));
const port = 5500;
// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
require("dotenv").config();

// Imports the Google Cloud client library.
// const { Storage } = require("@google-cloud/storage");

// // Instantiates a client. If you don't specify credentials when constructing
// // the client, the client library will look for credentials in the
// // environment.
// const storage = new Storage();
// // Makes an authenticated API request.
// async function listBuckets() {
//   try {
//     const results = await storage.getBuckets();

//     const [buckets] = results;

//     console.log("Buckets:");
//     buckets.forEach((bucket) => {
//       console.log(bucket.name);
//     });
//   } catch (err) {
//     console.error("ERROR:", err);
//   }
// }
// listBuckets();

app.use(cors());

const schedulingText = [];

const App = (pinNum, dateOfB) => {
  const config = {
    sitekey: process.env.SITEKEY,
    pageurl: process.env.PAGEURL,
    apiKey: process.env.APIKEY,
    apiSubmitUrl: "http://2captcha.com/in.php",
    apiRetrieveUrl: "http://2captcha.com/res.php",
  };

  // const getPIN = function (pin) {
  //   return pin;
  // };

  // const getDOB = function (dateOfB) {
  //   return dateOfB;
  // };

  const chromeOptions = {
    executablePath: "/Program Files/Google/Chrome/Application/chrome.exe",
    headless: true,
    slowMo: 60,
    defaultViewport: null,
  };

  async function main() {
    const browser = await puppeteer.launch(chromeOptions);
    const page = await browser.newPage();

    console.log(`Navigating to ${config.pageurl}`);
    await page.goto(config.pageurl);
    try {
      const requestId = await initiateCaptchaRequest(config.apiKey);

      // const pin = getPIN();
      console.log(`Typing PIN ${pinNum}`);
      await page.type("#PIN", pinNum);

      // const dob = getDOB();
      console.log(`Typing DOB ${dateOfB}`);
      const input = await page.$("#DOB");
      await input.click({ clickCount: 3 });
      await input.type(dateOfB);

      const response = await pollForRequestResults(config.apiKey, requestId);

      console.log(`Entering recaptcha response ${response}`);
      await page.evaluate(
        `document.getElementById("g-recaptcha-response").innerHTML="${response}";`
      );

      console.log(`Submitting....`);
      page.click("#Submit");
    } catch (error) {
      console.log(
        "Your request could not be completed at this time, please check your pin number and date of birth.  Also make sure your internet connection is working and try again."
      );
      console.error(error);
    }

    await page.waitForSelector(
      "body > div.container.body-content > div:nth-child(1) > div:nth-child(2) > p"
    );
    const image = await page.$(
      "body > div.container.body-content > div:nth-child(1) > div:nth-child(2) > p"
    );
    await image.screenshot({
      path: "testResults.png",
    });

    await getImageText();
    await page.close(); // Close the website
    await browser.close(); //close browser
    await deleteImage();
  }
  main();

  async function getImageText() {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    console.log(`Looking for text in image`);
    // Performs label detection on the image file
    const [result] = await client.textDetection("./testResults.png");
    const [annotation] = result.textAnnotations;
    const text = annotation ? annotation.description : "";
    console.log("Extracted text from image:", text);
    schedulingText.push(text);
    console.log(schedulingText);
  }

  async function initiateCaptchaRequest(apiKey) {
    const formData = {
      key: apiKey,
      method: "userrecaptcha",
      googlekey: config.sitekey,
      json: 1,
      pageurl: config.pageurl,
    };

    console.log(
      `Submitting recaptcha request to 2captcha for ${config.pageurl}`
    );
    const response = await request.post(config.apiSubmitUrl, {
      form: formData,
    });
    console.log(response);
    return JSON.parse(response).request;
  }

  async function pollForRequestResults(
    key,
    id,
    retries = 90,
    interval = 5000,
    delay = 1500
  ) {
    console.log(`Waiting for ${delay} milliseconds....`);
    await timeout(delay);
    return poll({
      taskFn: requestCaptchaResults(key, id),
      interval,
      retries,
    });
  }

  function requestCaptchaResults(apiKey, requestId) {
    const url = `${config.apiRetrieveUrl}?key=${apiKey}&action=get&id=${requestId}&json=1`;
    console.log(url);
    return async function () {
      return new Promise(async function (resolve, reject) {
        console.log(`Polling for response...`);
        const rawResponse = await request.get(url);
        console.log(rawResponse);
        const resp = JSON.parse(rawResponse);
        console.log(resp);
        if (resp.status === 0) return reject(resp.request);
        console.log("Response received");
        console.log(resp);
        resolve(resp.request);
      });
    };
  }

  // DELETES THE FILE CREATED BY GOOGLEAPI
  function deleteImage() {
    const path = "./testResults.png";
    try {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    } catch (err) {
      console.error(err);
    }
  }

  const timeout = (ms) => new Promise((res) => setTimeout(res, ms));
};

// const userArray = [];
// app.get("/test", (req, res) => {
//   res.send(ads.toString().replace);
// });

// app.post("/data", (req, res) => {
//   var loginData = req.body;
//   console.log(loginData);
//   userArray.push(loginData);
//   res.send("info iS HERE!");
// });

app.use(express.urlencoded({ extended: false }));

// Route to Homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/static/login.html");
});

// Route to results Page
app.get("/results", (req, res) => {
  res.sendFile(__dirname + "/static/results.html");
});

app.post("/results", (req, res) => {
  // Insert Login Code Here

  let username = req.body.username;
  let password = req.body.password;
  App(username, password);
  res.send(schedulingText.toString());
});

app.listen(port, () => {
  console.log(`Scraper app listening at http://localhost:${port}`);
});
