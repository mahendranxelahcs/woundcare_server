const express = require("express");
const { processPDF } = require("../controllers/pdfController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/processPDF", upload.single("file"), processPDF);

module.exports = router;
