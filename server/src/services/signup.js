const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createUser(userData) {
    const {name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = new User ({
        name,
        email,
        password: hashedPassword
    });

    const savedUser = await createdUser.save();
    return savedUser;
}

async function findUserByEmail(email) {
    return await User.findOne({email: email})
}

module.exports = {createUser , findUserByEmail};