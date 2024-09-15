const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/eventsummarizer", {
    serverSelectionTimeoutMS: 5000
});

mongoose.connection.on("connected", () => {
    console.log("mongoo db connected")
});

mongoose.connection.on("error", (err)=> {
    console.log(err)
});

module.exports = mongoose;