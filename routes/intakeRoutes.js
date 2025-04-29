const express = require("express");
const {
    submitIntakeForm,
    saveHtmlContent,
    getAllIntakeForms,
    getIntakeFormById ,
    updateIntakeForm,
    uploadEmrbyId,
    getAllPhysicians
  } = require("../controllers/intakeFormController");

const router = express.Router();

router.post("/submit-intake", submitIntakeForm);
router.post("/saveHtml", saveHtmlContent);
router.get("/getAll", getAllIntakeForms);
router.get("/getById/:id", getIntakeFormById);
router.put("/update/:id", updateIntakeForm);
router.get("/uploadEmrByid/:id", uploadEmrbyId);
router.get("/getAllPhysician", getAllPhysicians);


module.exports = router;
