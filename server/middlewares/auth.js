import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "No token provided"
      });
    }

    // Make sure token follows the 'Bearer <token>' format
    const tokenParts = token.split(' ');
    if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
      return res.status(403).json({ success: false, message: "Invalid token format" });
    }

    const actualToken = tokenParts[1];

    // Verify token
    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
      }

      // Add decoded token information to request (e.g., user ID and type)
      req.user = {
        id: decoded.id,
        user_type: decoded.user_type // Add other relevant information as needed
      };

      next();
    });
  };

export default authMiddleware;
