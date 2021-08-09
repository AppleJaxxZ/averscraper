const vision = require("@google-cloud/vision");
const fs = require("fs");
require("dotenv").config();

async function getImageText() {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  console.log(`Looking for text in image`);
  // Performs label detection on the image file
  const [result] = await client.textDetection("./testResults.png");
  const [annotation] = result.textAnnotations;
  console.log(annotation);
  const text = annotation ? annotation.description : "";
  console.log("Extracted text from image:", text);
  const path = "./testResults.png";
  try {
    fs.unlinkSync(path);
    console.log("File removed:", path);
  } catch (err) {
    console.error(err);
  }
}
getImageText();
