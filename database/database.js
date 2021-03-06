const fs = require("fs");
let database;

class Database {
  constructor() {
    this.initDB = this.initDB();
  }

  initDB() {
    this.getData();
  }
  writeData(content) {
    fs.writeFile("./database/DB.json", content, "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("Data was saved!");
    });
  }

  getData() {
    fs.readFile("./database/DB.json", "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      database = JSON.parse(data);
    });
  }

  checkIfExists(url) {
    for (let i in database) {
      if (database[i].fullUrl === url) {
        return database[i].shorturl;
      }
    }
    return -1;
  }

  getNewId() {
    return database[0].idcount + 1;
  }

  addNewLink(url) {
    database.push(this.createLinkObj(url));
    database[0].idcount = this.getNewId();
  }

  createLinkObj(url, flag) {
    let obj;
    if (!flag) {
      obj = { shorturl: this.getNewId(), fullUrl: url };
    } else {
      obj = { shorturl: this.getIdByLink(url), fullUrl: url };
    }
    return obj;
  }

  getIdByLink(url) {
    for (let i in database) {
      if (database[i].fullUrl === url) {
        return database[i].shorturl;
      }
    }
    return -1;
  }

  saveDatabase() {
    this.writeData(JSON.stringify(database));
  }

  getObjById(url) {
    for (let i in database) {
      if (database[i].fullUrl === url) {
        return database[i];
      }
    }
    return -1;
  }
}

module.exports = Database;
