import { Inquiry, PropertyBuyer, Property } from '../models/index.js';
import jwt from 'jsonwebtoken';

export const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.findAll({
            include: [PropertyBuyer, Property]
        });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createInquiry = async (req, res) => {

    const token = req.session.token; // Retrieve the token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect to login if no token
    }

    try { 

         const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
                // Extract UserID from the decoded token (assuming `decoded` contains `UserID`)
                const buyerId = decoded.userId; 
                console.log('Client ID for inquery:', decoded);


        const { PropertyID, message, inquiryType, contactMethod, visitDate } = req.body;
        console.log(req.body);
        console.log('Client ID:', buyerId);
        
        // Assuming user is authenticated and we have their ID
        // const buyerId = req.user.BuyerID; // Assuming `req.user` holds the logged-in user data

        // Validate Property
        const property = await Property.findByPk(PropertyID);
        console.log('Property:', property);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Save Inquiry
        const newInquiry = await Inquiry.create({
            BuyerID: buyerId,
            PropertyID: PropertyID,
            Message: message,
            InquiryType: inquiryType,
            ContactMethod: contactMethod,
            VisitDate: visitDate || null,
            Status: 'open'
        });

        res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


