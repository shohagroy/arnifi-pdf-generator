import puppeteerCore from "puppeteer-core";
import localPuppeteer from "puppeteer";
import envConfig from "../config.js";

const generatePdf = async (htmlContent, res) => {
  let browser;

  try {
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
    await page.setContent(htmlContent);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: "50px",
        right: "50px",
        bottom: "50px",
        left: "50px",
      },
      displayHeaderFooter: true,
      headerTemplate: `<div></div>`,
      footerTemplate: `
      <div style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; text-align: right; width: 100%; padding-right: 20px;">
      <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>`,
    });

    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
  } catch (error) {
    res.error(error);
  } finally {
    await browser.close();
  }
};
export default generatePdf;
