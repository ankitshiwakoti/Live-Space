
import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next) => {
    const token = req.session.token;

    console.log('Token in Session:', token);  // Check if the token is being sent with the request

    if (!token) {
        // Render the error page or redirect to the login page
        return res.render('error', { errorMessage: 'Access Denied. please login first.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request object
        next();
    } catch (error) {
        return res.render('error', { errorMessage: 'Access Denied. please login first.' });
    }
};


export default verifyToken;

