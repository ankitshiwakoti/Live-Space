import express from 'express';
import { getAllProperties } from '../controller/userController.js';

const router = express.Router();

// Route to fetch and display all properties on the dashboard
router.get('/dashboard', getAllProperties);

export default router;