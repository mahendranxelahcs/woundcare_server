const express = require("express");
const { processOASISPDF } = require("../controllers/oasisController");
const uploads= require("../middleware/oasisupload");

const router = express.Router();

router.post("/processOASISPDF", uploads.single("file"), processOASISPDF);

module.exports = router;
