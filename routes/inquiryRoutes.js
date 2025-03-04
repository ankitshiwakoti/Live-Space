import express from 'express';
import { getAllInquiries, createInquiry } from '../controller/InquiryController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();

router.get('/', getAllInquiries);  // Get all inquiries
router.post('/inquiry', verifyToken, createInquiry); // Create an inquiry

export default router;
