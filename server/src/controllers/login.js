const authService = require("../services/login");

async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        const result = await authService.login(email, password);

        if (result.error) {
            return res.status(401).json({ message: result.error });
        }

        res.json({ token: result.token });

    } catch (err) {
        res.status(500).json({ message: "An unexpected error occurred" });
    }
}

module.exports = {
    login
};
