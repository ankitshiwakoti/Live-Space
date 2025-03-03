
import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
    const token = req.session.token;

    console.log('Token in Session:', token);  // Check if the token is being sent with the request

    if (!token) {
        return res.status(403).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};


export default verifyToken;
