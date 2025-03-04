import express from 'express';
import { createClient,createAgent, loginUser, dashboard,logoutUser } from '../controller/RealEstateUserController.js';
import verifyToken from '../middleware/authMiddleWare.js';
import { validateAgentSignup } from '../middleware/validationMiddleware.js';

const router = express.Router();

// Render login and signup pages
router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signupagent', (req, res) => {
    res.render('signupagent');
});

// Login route to handle user login
router.post('/login', loginUser);

// Dashboard route, uses token verification middleware
router.get('/dashboard', verifyToken, dashboard);

// Profile route accessible only with a valid token
router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: 'Welcome to your profile', user: req.user });
});

// User creation (signup route)
router.post('/signupagent',validateAgentSignup, createAgent);
router.post('/signupclient', createClient);

// Logout route to handle user logout
router.get('/logout', logoutUser);

// Render landing page
router.get('/landing', (req, res) => {
    res.render('landing');
});
export default router;
