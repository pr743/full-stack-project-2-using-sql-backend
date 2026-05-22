const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        console.log("HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "No token provided"
            });
        }

        if (!authHeader.startsWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format"
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = authMiddleware;