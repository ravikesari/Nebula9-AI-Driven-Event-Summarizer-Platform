const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticateToken(req, res, next) {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header is not formatted correctly" });
    }

    const token = authHeader.split(" ")[1];

    console.log("Received token:", token); 

    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }

    try {
        const verified = jwt.verify(token, secretKey);
        console.log("Token verified successfully:", verified);
        req.user = verified;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return res.status(403).json({ message: "Invalid token", error: err.message });
    }
}

module.exports = { authenticateToken };
