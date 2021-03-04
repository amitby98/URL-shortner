require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/public", express.static(`./public`));
// app.use("/", express.static(`./views`)); //??

app.post("/api/shorturl/new", async (req, res) => {
  const fullUrl = req.body.url;
  console.log(req.body);
  //const shortUrl = await database.add(fullUrl);
  res.json({ shortUrl: 12, fullUrl }); //If i were to send shortUrl, id get :
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
