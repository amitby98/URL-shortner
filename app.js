require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

app.use("/public", express.static(`./public`));
// app.use("/", express.static(`./views`)); //??

app.post("/api/shorturl/new", async (req, res) => {
  const fullUrl = req.body.url;
  if (!fullUrl) {
    return res.status(404).json({ message: "url not exist" });
  } else if (!isUrl(fullUrl)) {
    return res.status(422).json({ message: "Not a valid url" });
  }
  let jsonContent = JSON.stringify(req.body);
  // console.log(jsonContent);
  fs.writeFile(`./database/DB.json`, jsonContent, "utf8", function (err) {
    if (err) {
      console.log("An error occur while writing JSON Object to File.");
      return console.log(err);
    }
    console.log("JSON file has been saved.");
  });
  res.send(req.body);
});

app.get("/api/shorturl/new", (req, res) => {
  fs.readFile("./database/DB.json", "utf8", (err, data) => {
    if (err) {
      res.status(422).json({ message: "Not a valid!!!!" });
      return;
    }
    res.send(data);
  });
});

function isUrl(text) {
  let url;
  try {
    url = new URL(text);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
