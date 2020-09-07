// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const Product = require("../models/Product");
const puppeteer = require("puppeteer");
require("dotenv").config();

mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    scrapWebPage();
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

async function scrapWebPage() {
  let mainUrl = "";
  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(mainUrl, { waitUntil: "networkidle2" });
  let data = await page.evaluate(() => {
    //queries and stuff to do
  });
  await browser.close();
}
