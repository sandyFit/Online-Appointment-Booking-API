import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const tokenWithoutBearer = token.split(' ')[1]; // Get token without 'Bearer '

    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Auth failed' });
        }

        req.userId = decoded.id; // Assuming the token contains user ID
        next();
    });
};

export default authMiddleware;
