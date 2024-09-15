const express = require("express");
const router = express.Router();
const {handleFileUpload} = require("../controllers/summary");
const {authenticateToken} = require("../utils/authMiddleware")
const {upload} = require("../services/extractContent");


router.post('/upload', authenticateToken, upload.single('file'), handleFileUpload);

module.exports = router;