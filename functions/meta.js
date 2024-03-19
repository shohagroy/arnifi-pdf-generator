const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
require("dotenv").config();

exports.handler = async function (event, context) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath),
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto("https://www.google.com/search?q=arnifi", {
    waitUntil: "networkidle2",
  });

  const pdfBuffer = await page.pdf();
  const title = await page.title();
  await browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      status: "Ok",
      page: {
        title,
      },
      pdf: pdfBuffer,
    }),
  };
};
