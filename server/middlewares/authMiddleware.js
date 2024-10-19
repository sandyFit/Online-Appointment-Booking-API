import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // GET TOKEN FROM AUTHORIZATION HEADER
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({
        success: false,
        message: 'No token provider'
    });

    // MAKE SURE TOKEN FOLLOWS THE BEARER <TOKEN> FORMAT
    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
        return res.status(403).json({
            success: false,
            message: 'Invalid token format'
        });
    }

    const actualToken = tokenParts[1];

    // VERIFY TOKEN
    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            })
        }

        // ADD DECODED TOKEN INFORMATION TO REQUEST (e.g, USER ID AND TYPE)
        req.user = {
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
            user_type: decoded.user_type
        };
        next();
    })
}

export default authMiddleware;
