import express from 'express';
import { getAddProperty, postAddProperty,updateProperty, deleteProperty, editProperty } from '../controller/adminController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();

// Route to display add property form
router.get('/properties/add', getAddProperty);

// Route to handle add property form submission
router.post('/properties/add',verifyToken ,postAddProperty);

router.get('/properties/edit/:id',editProperty); // Show edit form
router.post('/properties/edit/:id',verifyToken, updateProperty); // Handle update
router.post('/properties/delete/:id', deleteProperty); // Handle delete

export default router;
