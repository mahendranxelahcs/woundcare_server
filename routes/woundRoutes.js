const express = require("express");
const { handleWoundImage, generateWoundReport } = require("../controllers/woundController");
const upload = require("../middleware/uploadImage");

const router = express.Router();

// ✅ Route for image upload & analysis
router.post("/analyzeWound", upload.single("file"), handleWoundImage);

// ✅ Route for final report generation
router.post("/generateWoundReport", generateWoundReport);

module.exports = router;
