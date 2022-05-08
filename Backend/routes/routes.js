const express = require("express");
const controller = require("../controllers/controller.js");

const router = express.Router();

router.get("/test", controller.testGet);

module.exports = router;
