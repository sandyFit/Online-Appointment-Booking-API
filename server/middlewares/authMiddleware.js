import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: "No token provided" });
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
      return res.status(401).json({ success: false, message: "Failed to authenticate token" });
    }
    
    req.userId = decoded.id;  // Add user ID to request object
    next();
  });
};

export default authMiddleware;
