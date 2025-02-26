import express from 'express';
import { getAllInquiries, createInquiry } from '../controller/InquiryController.js';

const router = express.Router();

router.get('/', getAllInquiries);  // Get all inquiries
router.post('/', createInquiry);   // Create an inquiry

export default router;
