require("dotenv").config();

let chrome = {};
let puppeteer;

//puppeteer-core@6.0.0

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

const scrapeLogic = async (res) => {
  console.log("scrapeLogic run");
  const html = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>test pdf</title>
  </head>
  <body>
    this is test html pdf
  </body>
</html>
    `;

  let options = {};

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

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

    // let page = await browser.newPage();
    // await page.goto("https://www.google.com");

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

module.exports = { scrapeLogic };
