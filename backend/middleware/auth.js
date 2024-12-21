import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {

    try {

        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({
                message: "Invalid Token",
                success: false
            });
        }

        req.id = decoded.userId;
        next()

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong, Please try again later",
            error: error.message
        })
    }
}

export default isAuthenticated;