const express = require("express");
const { handleGetSchool, handleAddSchool } = require("../controller/schoolController");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json("Its working");
});

router.get('/listSchools', handleGetSchool);
router.post('/addSchool', handleAddSchool);

module.exports = router;