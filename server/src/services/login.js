const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

async function login(email, password) {
    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return { error: "Email is not registered" }
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordValid) {
            return { error: "Incorrect Password" }
        }

        const token = generateToken(existingUser)
        return { token }

    } catch (err) {
        throw new Error("An unexpected error occurred");
    }
}

module.exports = {
    login
};
