import express from 'express';
import { getUserInquiries,getAgentInquiries, createInquiry,updateStatus } from '../controller/InquiryController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();

router.get('/inquiry', verifyToken , getUserInquiries);  // Get all inquiries
router.get('/agent/inquiry', verifyToken , getAgentInquiries);  // Get all inquiries
router.post('/inquiry', verifyToken, createInquiry); // Create an inquiry

router.post('/agent/inquiry/update-status/:inquiryID', updateStatus);

export default router;
