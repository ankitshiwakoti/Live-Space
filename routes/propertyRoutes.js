import express from 'express';
import { getAllProperties, getPropertyById, createProperty, deleteProperty } from '../controller/PropertyController.js';

const router = express.Router();

router.get('/', getAllProperties);      // Get all properties
router.get('/:id', getPropertyById);    // Get property by ID
router.post('/', createProperty);       // Create a new property
router.delete('/:id', deleteProperty);  // Delete a property

export default router;
