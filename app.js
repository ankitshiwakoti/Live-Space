import express from 'express';
import session from 'express-session';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import realEstateUserRoutes from './routes/realEstateUserRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import sequelize from './config/database.js';
import authLimiter from './middleware/authLimiter.js'; 
import adminRoutes from './routes/adminRoutes.js';
// import helmet from 'helmet';
import xss from 'xss-clean';

dotenv.config();

const app = express();


app.use(cors());  // Allow all origins
app.use(authLimiter);  // Limit requests to /api/users/login and /api/users/signup

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));
app.use(session({
    secret: process.env.SESSION_SECRET, // Store this in .env
    resave: false,
    saveUninitialized: true,
    cookie: { httpOnly: true, secure: process.env.NODE_ENV === 'production' }
}));

// Apply xss-clean to sanitize incoming data
app.use(xss());

// Set View Engine
app.set('view engine', 'ejs');

// Security


// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "http://localhost:5000"],
//       styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"], // Add the CDN domain here
//       imgSrc: ["'self'", "data:", "https://example.com"],
//       fontSrc: ["'self'", "https://fonts.gstatic.com"],
//       connectSrc: ["'self'", "ws://localhost:5000"],
//     },
//   })
// );


// Routes
app.use('/api/users', authLimiter , realEstateUserRoutes);
app.use('/users', authLimiter, realEstateUserRoutes);  // Now, '/users/login' and '/users/signup' will be accessible 
app.use('/api/properties', authLimiter, propertyRoutes);
app.use('/api/inquiries', authLimiter, inquiryRoutes);

app.use('/admin', adminRoutes);

// Home Route
app.get('/', (req, res) => {
    console.log('Root path ("/") accessed');
    res.send('Server is running!');
});


// Sync Database & Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    console.log("Database connected and tables created!");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
