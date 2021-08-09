const vision = require("@google-cloud/vision");
const fs = require("fs");
require("dotenv").config();

async function getImageText() {
  try {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    console.log(`Looking for text in image`);
    // Performs label detection on the image file
    const [result] = await client.textDetection("./testResults.png");
    const [annotation] = result.textAnnotations;
    console.log(annotation);
    const text = annotation ? annotation.description : "";
    console.log("Extracted text from image:", text);
  } catch (error) {
    console.log("There is no text to display, please re-try again later.");
  }
  try {
    const path = "./testResults.png";
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.log(
      "There is no file to delete..The file has already been deleted or was not downloaded.  Check the file name and location."
    );
  }
}
getImageText();
