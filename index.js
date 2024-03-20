import express from "express";
import cors from "cors";
import generatePdf from "./utils/generatePdf.js";
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));

const PORT = process.env.PORT || 4000;

app.post("/api/generate-pdf", (req, res) => {
  const { template } = req.body;
  generatePdf(template, res);
});

app.get("/", (req, res) => {
  res.send("Arnifi - PDf Generator API v1.0.0");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
