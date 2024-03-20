import { config } from "dotenv";
config();

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const scrapeLogic = async (res) => {
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test html pdf</title>
  </head>
  <body>
    <h1>This is Test Html PDF</h1>
  </body>
</html>
  `;
  let options = {
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? await chrome.executablePath()
        : process.env.PUPPETEER_EXECUTABLE_PATH,
    headless: true,
    ignoreHTTPSErrors: true,
  };

  try {
    console.log("launching puppeteer");
    let browser = await puppeteer.launch(options);
    console.log("browser created");
    const page = await browser.newPage();

    await page.setContent(html);

    console.log("page loaded");
    const pdf = await page.pdf({
      format: "a4",
      printBackground: true,
    });

    console.log("pdf created");

    res.json({ message: "pdf create", pdf });
  } catch (err) {
    console.error(err);
    return null;
  }
};
