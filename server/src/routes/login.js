const express = require("express")
const {login} = require("../controllers/login")
const cors = require("cors")

const router = express.Router();


router.use(cors());

router.post("/login" , login)

module.exports = router;