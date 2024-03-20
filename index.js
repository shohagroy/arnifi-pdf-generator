import express from "express";
import { scrapeLogic } from "./scrapeLogic.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/scrape", (req, res) => {
  console.log("api call");
  scrapeLogic(res);
});

app.get("/", (req, res) => {
  res.send("Render Puppeteer server is up and running!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
