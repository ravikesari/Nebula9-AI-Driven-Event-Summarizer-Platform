const express = require('express')
const router = express.Router();
const Summary = require("../models/summary");
const {authenticateToken} = require("../utils/authMiddleware");


router.get('/history', authenticateToken, async (req, res) => {
    const userId = req.user.id;

    try{
        const history = await Summary.find({ userId }).sort({caretedAt: -1});
        
        res.json(history)
    }catch(err){
        res.status(500).json({message: "Error fetching user hsitory", err})
    }
});

module.exports = router;