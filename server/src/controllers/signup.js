const userService = require("../services/signup");

async function createUser(req, res) {
    try{
        const userData = req.body;

        const existingUser = await userService.findUserByEmail(userData.email);
        if(existingUser){
            return res.status(409).json({message : "Email is already registered"})
        }

        const user = await userService.createUser(userData);
        res.status(201).json({user: user, message: "User created succesfully"});
        
    }catch(err){
        console.log(err);
        res.status(400).json({message: err.message});
    }
}

module.exports = {createUser}