import puppeteerCore from "puppeteer-core";
import localPuppeteer from "puppeteer";
import envConfig from "../config.js";

const generatePdf = async (res) => {
  let browser;

  if (envConfig.NODE_ENV === "production") {
    browser = await puppeteerCore.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-zygote",
      ],
      executablePath: envConfig.PUPPETEER_EXECUTABLE_PATH,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  } else {
    browser = await localPuppeteer.launch({
      headless: true,
    });
  }

  const page = await browser.newPage();

  await page.goto("https://www.google.com/search?q=arnifi", {
    waitUntil: "networkidle2",
  });

  const pageTitle = await page.title();

  console.log(pageTitle);

  await browser.close();

  //   await page.setContent(htmlContent);
  //   const pdf = await page.pdf();
  //   await browser.close();

  //   res.setHeader("Content-Type", "application/pdf");
  //   res.send(pdf);

  //   res.send("browser closed");

  res.json({ message: "pdf generate successfully", title: pageTitle });
};
export default generatePdf;
