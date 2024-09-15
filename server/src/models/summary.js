const mongoose = require("../configuration/dbconfig")

const summarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    fileContent: {
        type: String,
        required: true
    },
    summaryText : {
        type: String,
        required: true
    },
    caretedAt: {
        type: Date,
        default: Date.now()
    }

});


module.exports = mongoose.model("Summary", summarySchema);