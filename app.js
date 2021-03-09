require("dotenv").config();
const fs = require("fs");
const express = require("express");
const urlExists = require("url-exists");
const cors = require("cors");
const { captureRejectionSymbol } = require("events");
const app = express();
const Database = require("./database/database.js");
const database = new Database();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/public", express.static(`./public`));
app.use(express.static(__dirname + "/views"));

app.post("/api/shorturl/new", async (req, res) => {
  const fullUrl = req.body.url;
  if (isUrl(fullUrl)) {
    urlExists(fullUrl, function (err, exists) {
      if (exists) {
        if (database.checkIfExists(fullUrl) === -1) {
          database.addNewLink(fullUrl);
          database.saveDatabase();
          res.json(database.createLinkObj(fullUrl, true));
        } else {
          res.json(database.getObjByUrl(fullUrl));
        }
      } else {
        res.json({ message: "Page not found " });
      }
    });
  } else {
    res.json({ error: "URL is not valid!" });
  }
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

app.get("/:id", (req, res) => {
  const id = req.params.id.replace(":", "");
  let obj = database.getObjById(id);
  if (obj !== -1) {
    res.redirect(303, obj.fullUrl);
    database.updateClicks(id);
  }
});

app.get("/api/stats", (req, res) => {
  let data = database.getDatabase();
  res.json(200, data);
});

module.exports = app;
