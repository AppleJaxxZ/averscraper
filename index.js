const puppeteer = require("puppeteer");
const fs = require("fs");
const request = require("request-promise-native").defaults({ Jar: true });
const poll = require("promise-poller").default;
// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
require("dotenv").config();

const config = {
  sitekey: process.env.SITEKEY,
  pageurl: process.env.PAGEURL,
  apiKey: process.env.APIKEY,
  apiSubmitUrl: "http://2captcha.com/in.php",
  apiRetrieveUrl: "http://2captcha.com/res.php",
};

const getPIN = function () {
  return "2520228";
};

const getDOB = function () {
  return "09/10/1987";
};

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

    const pin = getPIN();
    console.log(`Typing PIN ${pin}`);
    await page.type("#PIN", pin);

    const dob = getDOB();
    console.log(`Typing DOB ${dob}`);
    const input = await page.$("#DOB");
    await input.click({ clickCount: 3 });
    await input.type(dob);

    const response = await pollForRequestResults(config.apiKey, requestId);

    console.log(`Entering recaptcha response ${response}`);
    await page.evaluate(
      `document.getElementById("g-recaptcha-response").innerHTML="${response}";`
    );

    console.log(`Submitting....`);
    page.click("#Submit");
  } catch (error) {
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
}

async function initiateCaptchaRequest(apiKey) {
  const formData = {
    key: apiKey,
    method: "userrecaptcha",
    googlekey: config.sitekey,
    json: 1,
    pageurl: config.pageurl,
  };

  console.log(`Submitting recaptcha request to 2captcha for ${config.pageurl}`);
  const response = await request.post(config.apiSubmitUrl, { form: formData });
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
