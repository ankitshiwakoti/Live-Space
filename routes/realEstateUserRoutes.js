import express from 'express';
import { getAllUsers, getUserById, createUser, deleteUser } from '../controller/RealEstateUserController.js';

const router = express.Router();

router.get('/', getAllUsers);      // Get all users
router.get('/:id', getUserById);   // Get user by ID
router.post('/', createUser);      // Create a new user
router.delete('/:id', deleteUser); // Delete user

export default router;
