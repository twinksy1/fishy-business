const EXPRESS = require("express");
const DB_CONN = require("./dbConn.json");
const FS = require("fs");
const {Client} = require("pg");
const PATH = require("path");
const ROUTER = EXPRESS.Router();

const CONN = new Client(DB_CONN);
CONN.connect();

const APP = EXPRESS();
APP.use(EXPRESS.static("./Public"));
const PORT = process.env.PORT || 3000;

// Web pages
ROUTER.get("/", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/Home/Index.html"));
});
ROUTER.get("/fish-category", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/Fish-Choice/Index.html"));
});
ROUTER.get("/fish-category/fw-inventory", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/FW-Selection/Index.html"));
});
ROUTER.get("/fish-category/sw-inventory", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/SW-Selection/Index.html"));
});
ROUTER.get("/plants-category", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/Plants-Choice/Index.html"));
});
ROUTER.get("/plants-category/fw-inventory", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/FW-Selection/Index.html"));
});
ROUTER.get("/plants-category/sw-inventory", function(req, res) {
    res.sendFile(PATH.join(__dirname + "/Web-Pages/SW-Selection/Index.html"));
});

// SQL
ROUTER.post("/freshwaterFish", async function(req, res) {
    let results = {};
    try {
        results = await CONN.query("SELECT * FROM retrieveFreshwaterFish;");
    } catch(err) {
        console.log(err);
    } finally {
        res.send(results.rows);
    }
});
ROUTER.post("/saltwaterFish", async function(req, res) {
    let results = {};
    try {
        results = await CONN.query("SELECT * FROM retrieveSaltwaterFish;");
    } catch(err) {
        console.log(err);
    } finally {
        res.send(results.rows);
    }
});
ROUTER.post("/freshwaterInvertebrates", async function(req, res) {
    let results = {};
    try {
        results = await CONN.query("SELECT * FROM retrieveFreshwaterInvertebrates;");
    } catch(err) {
        console.log(err);
    } finally {
        res.send(results.rows);
    }
});
ROUTER.post("/saltwaterInvertebrates", async function(req, res) {
    let results = {};
    try {
        results = await CONN.query("SELECT * FROM retrieveSaltwaterInvertebrates;");
    } catch(err) {
        console.log(err);
    } finally {
        res.send(results.rows);
    }
});
ROUTER.post("/freshwaterPlants", async function(req, res) {
    let results = {};
    try {
        results = await CONN.query("SELECT * FROM retrieveFreshwaterPlants;");
    } catch(err) {
        console.log(err);
    } finally {
        res.send(results.rows);
    }
});
ROUTER.post("/saltwaterPlants", async function(req, res) {
    let results = {};
    try {
        results = await CONN.query("SELECT * FROM retrieveSaltwaterPlants;");
    } catch(err) {
        console.log(err);
    } finally {
        res.send(results.rows);
    }
});


APP.use(EXPRESS.json());
APP.use("/", ROUTER);
APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));