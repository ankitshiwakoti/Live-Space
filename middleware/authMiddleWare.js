// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//     const token = req.header('Authorization');
//     if (!token) return res.status(403).json({ message: 'Access Denied' });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified; // Attach user info to the request
//         next(); // Continue to the next middleware/route
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid Token' });
//     }
// };

// export default verifyToken;
import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//     // Extract token from the Authorization header
//     const token = req.header('Authorization')?.split(' ')[1];  // Split to get the token part after 'Bearer'
//     console.log("Token:", token);
//     console.log("header:", req.header('Authorization'));
//     if (!token) return res.status(403).json({ message: 'Access Denied. No token provided.' });

//     try {
//         // Verify the token using the secret key
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         console.log("Verified Token:", verified);
//         req.user = verified;  // Attach decoded user info to the request object
//         next();  // Proceed to the next middleware or route handler
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid or expired token.' });
//     }
// };

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
