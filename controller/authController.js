import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { RealEstateUser,Property,PropertyAgent,PropertyBuyer, Location } from '../models/index.js';
import jwt from 'jsonwebtoken';

// Controller to generate 2FA and render the page with QR Code
export const generate2FA = async (req, res) => {
    try {
        const { email } = req.query;
        // Generate a new secret for the user
        const secret = speakeasy.generateSecret({ name: 'Property ' });

        // Save the secret key to the user's record in the database
        const user = await RealEstateUser.findOne({ where: { Email: email } });
        user.TwoFASecret = secret.base32;
        await user.save(); 

        // Generate a QR code for the user to scan
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        // Render the `generate-2fa.ejs` page with the QR code and secret
        res.render('generate-2fa', {
            qrCodeImageUrl: qrCodeUrl,
            secret: secret.base32,
        });
    } catch (error) {
        console.error('Error generating 2FA:', error);
        res.status(500).json({ message: 'Error generating 2FA.' });
    }
};

// Controller to verify the 2FA token entered by the user
export const verify2FA = async (req, res) => {
    const token = req.session.token; // Retrieve the JWT token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect to login if no token
    }

    try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Extract UserID and email from the decoded token
        const UserID = decoded.userId; 
        const email = decoded.email;

        console.log('User ID:', decoded);

        const user = await RealEstateUser.findOne({ where: { Email: email } });

        if (!user || !user.TwoFASecret) {
            return res.status(400).json({ message: '2FA secret not set up.' });
        }

        // Get the 2FA token entered by the user from the request body
        const userToken = req.body.token;  // Assuming the token is sent in the body of the request

        if (!userToken) {
            return res.status(400).json({ message: '2FA token is required.' });
        }

        // Verify the entered token using the user's secret
        const verified = speakeasy.totp.verify({
            secret: user.TwoFASecret,
            encoding: 'base32',
            token: userToken,  // <-- This is the OTP entered by the user
        });

        if (verified) {
            // 2FA is successful, redirect to login or dashboard
            if (user.Role === 'agent') {
                return res.redirect('/api/users/dashboard');  // Redirect to agent's dashboard
            } else {
                return res.redirect('/user/dashboard');  // Redirect to regular user's dashboard
            }
        } else {
            // 2FA failed, show error
            res.status(401).render('generate-2fa', {
                error: 'Invalid 2FA token. Please try again.',
                qrCodeImageUrl: await qrcode.toDataURL(user.twoFASecret),
                secret: user.twoFASecret,
            });
        }
    } catch (error) {
        console.error('Error verifying 2FA:', error);
        res.status(500).json({ message: 'Error verifying 2FA.' });
    }
};



// Controller to render the verify-2fa page
export const renderVerify2FA = (req, res) => {
    res.render('verify-2fa');
};
