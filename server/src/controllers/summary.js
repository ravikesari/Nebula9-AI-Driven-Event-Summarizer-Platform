const {summarizeFile} = require('../services/summary');
const Summary = require("../models/summary")

async function handleFileUpload(req, res){
    try{
        const file = req.file;
        const userId = req.user.id;

        const {fileContent, summaryText} = await summarizeFile(file);

        const newSummary = new Summary({
            userId: userId,
            filename: file.originalname,
            fileContent: fileContent,
            summaryText: summaryText
        });

        await newSummary.save();

        res.status(200).json({
            message: "File summarized successfully",
            fileContent,
            summaryText
        });


    }catch(err){
        res.status(500).json({message: "error during file summarization", error: err.message})
    }
}

module.exports = {handleFileUpload}