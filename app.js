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

dotenv.config();

const app = express();


app.use(cors());  // Allow all origins

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: false }));

// Set View Engine
app.set('view engine', 'ejs');

// Routes
app.use('/api/users', realEstateUserRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/inquiries', inquiryRoutes);

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
