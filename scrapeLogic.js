import { config } from "dotenv";

config();

import chrome from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const scrapeLogic = async (res) => {
  let options = {
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : await chrome.executablePath(),
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

  //   //   const browser = await puppeteer.launch();

  //   const browser = await puppeteer.launch({
  //     args: [
  //       "--disable-setuid-sandbox",
  //       "--no-sandbox",
  //       "--single-process",
  //       "--no-zygote",
  //     ],
  //     executablePath:
  //       process.env.NODE_ENV === "production"
  //         ? process.env.PUPPETEER_EXECUTABLE_PATH
  //         : puppeteer.executablePath(),
  //   });

  //   try {
  //     const page = await browser.newPage();
  //     await page.setContent(html);

  //     const pdf = await page.pdf({
  //       format: "a4",
  //       printBackground: true,
  //     });

  //     console.log(pdf);
  //     await browser.close();

  //     res.send("ok");
  //   } catch (e) {
  //     console.error(e);
  //     res.send(`Something went wrong while running Puppeteer: ${e}`);
  //   }
};
