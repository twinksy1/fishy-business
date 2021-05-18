const EXPRESS = require("express");
const FS = require("fs");
const PATH = require("path");
const ROUTER = EXPRESS.Router();


const APP = EXPRESS();
APP.use(EXPRESS.static("./Public"));
const PORT = process.env.PORT || 3000;

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




APP.use(EXPRESS.json());
APP.use("/", ROUTER);
APP.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));