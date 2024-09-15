const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const fs = require("fs");
const mime = require("mime-types");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});



async function extractContent(file) {
    const fileType = mime.lookup(file.originalname);

    if(fileType === 'application/pdf'){
        const dataBuffer = fs.readFileSync(file.path);
        const pdfData = await pdfParse(dataBuffer);
        return pdfData.text;

    }else if(fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        const dataBuffer = fs.readFileSync(file.path);
        const docx = await mammoth.extractRawText({buffer: dataBuffer});
        return docx.value;

    }else if(fileType.startsWith('text/')){
        return fs.promises.readFile(file.path, 'utf-8');
    }else{
        throw new Error("Unsupported file type")
    }
}

module.exports = {upload, extractContent};