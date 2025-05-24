const express = require("express");
const { handleGetSchool, handleAddSchool } = require("../controller/schoolController");
const router = express.Router();

router.get('/listSchools' , handleGetSchool);
router.post('/addSchool' , handleAddSchool);

module.exports = router;