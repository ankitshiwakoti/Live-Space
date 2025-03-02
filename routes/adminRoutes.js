import express from 'express';
import { getAddProperty, postAddProperty } from '../controller/adminController.js';

const router = express.Router();

// Route to display add property form
router.get('/properties/add', getAddProperty);

// Route to handle add property form submission
router.post('/properties/add', postAddProperty);

export default router;
