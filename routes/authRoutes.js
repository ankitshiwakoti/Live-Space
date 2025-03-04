import express from 'express';
import { generate2FA, verify2FA, renderVerify2FA} from '../controller/authController.js';
import verifyToken from '../middleware/authMiddleWare.js';

const router = express.Router();

// Route to generate 2FA for a user after signup
router.get('/generate-2fa', generate2FA);

// Route to verify the 2FA token entered by the user
router.post('/verify-2fa', verify2FA);

router.get('/verify-2fa',renderVerify2FA);

router.get('/done', (req, res) => {
    res.render('api/users/login');
});

export default router;
