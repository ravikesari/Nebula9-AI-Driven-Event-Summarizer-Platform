const express = require("express");
const app = express()
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const bodyParser = require("body-parser")
const cors = require('cors');
const uploadRoute = require("./routes/summary")
const userHistory = require('./routes/userHistory')

app.use(cors());


app.use(bodyParser.json());

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", uploadRoute);
app.use("/api/user", userHistory)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})