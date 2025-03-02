import express from 'express';
import { createClient,createAgent, loginUser, dashboard } from '../controller/RealEstateUserController.js';
import verifyToken from '../middleware/authMiddleWare.js';

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
router.post('/signupagent', createAgent);
router.post('/signupclient', createClient);

export default router;
