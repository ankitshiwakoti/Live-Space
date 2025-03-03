import express from 'express';
import { getAllProperties, getPropertyById, createProperty, deleteProperty } from '../controller/PropertyController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();

// Admin Dashboard Route
// router.get('/dashboard', verifyToken, (req, res) => {
//     res.render('dashboard'); // Render dashboard page
// });

// router.get('/admin/dashboard', verifyToken, (req, res) => {
//     res.render('admin/dashboard'); // Serve the admin dashboard view
// });

router.get('/', verifyToken, getAllProperties);      // Get all properties
router.get('/:id', verifyToken,getPropertyById);    // Get property by ID
router.post('/add', verifyToken, createProperty);       // Create a new property
router.delete('/:id', verifyToken, deleteProperty);  // Delete a property

export default router;
