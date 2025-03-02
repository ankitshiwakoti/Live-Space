import { RealEstateUser,Property,PropertyAgent } from '../models/index.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Create a new user (sign-up)
 export const createAgent = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { Name, Email, Password, Role,LicenseNumber,ContactNumber } = req.body;

        const user = await RealEstateUser.findOne({ where: { Email: Email } });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const newUser = await RealEstateUser.create({
            Name,
            Email,
            Password: hashedPassword, // Store the hashed password
            Role
        });

        // If the user is an agent, create a PropertyAgent record
        if (Role === 'agent') {
            await PropertyAgent.create({
                AgentID: newUser.UserID,
                LicenseNumber,
                ContactNumber
            });
        }
        
        // res.status(201).json(newUser);
        return res.redirect('/api/users/login');  // Redirect to user's dashboard
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


export const createClient = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const { Name, Email, Password, Role,ContactNumber,PreferredContactMethod } = req.body;

        const user = await RealEstateUser.findOne({ where: { Email: Email } });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const newUser = await RealEstateUser.create({
            Name,
            Email,
            Password: hashedPassword, // Store the hashed password
            Role
        });

        // If the user is an agent, create a PropertyAgent record
        if (Role === 'client') {
            await PropertyAgent.create({
                BuyerID: newUser.UserID,
                ContactNumber,
                PreferredContactMethod
            });
        }
        
        // res.status(201).json(newUser);

        return res.redirect('/api/users/login'); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

// Handle user login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await RealEstateUser.findOne({ where: { Email: email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password using bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: user.UserID, email: user.Email, role: user.Role },
            process.env.JWT_SECRET, // Store this secret in .env
            { expiresIn: '1h' }
        );

        // Store token in session or send as cookie
        req.session.token = token;
        console.log('Stored Token:', req.session.token);

        // Redirect based on the role
        if (user.Role === 'agent') {
            return res.redirect('/api/users/dashboard');  // Redirect to agent's dashboard
        } else {
            return res.redirect('/dashboard');  // Redirect to regular user's dashboard
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const dashboard = async (req, res) => {
    const token = req.session.token; // Retrieve the token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect to login if no token
    }

    try {
        // Verify the token and decode user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Extract UserID from the decoded token (assuming `decoded` contains `UserID`)
        const userId = decoded.userId; 
        console.log('User ID:', decoded);

        // Fetch properties belonging to the user
        const properties = await Property.findAll({ where: { AgentID: userId } });

        // Render the dashboard view with the user's properties
        res.render('dashboard', { properties });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.redirect('/api/users/login'); // Redirect if token verification fails
    }
};

