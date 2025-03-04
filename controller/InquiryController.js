import e from 'express';
import { Inquiry,Location, PropertyBuyer, Property } from '../models/index.js';
import jwt from 'jsonwebtoken';


export const getUserInquiries = async (req, res) => {
    try {
        // Retrieve token from session
        const token = req.session.token;
        if (!token) {
            return res.redirect('/api/users/login');
        }

        // Decode token to get BuyerID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const buyerId = decoded.userId;

        // Fetch inquiries with property details and location
        const inquiries = await Inquiry.findAll({
            where: { BuyerID: buyerId },
            include: [
                {
                    model: Property,
                    attributes: ['Title'], // Fetch only the required fields
                    include: [
                        {
                            model: Location,
                            attributes: ['AddressLine1', 'City', 'State', 'Country'] // Fetch location details
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        // Separate inquiries by status
        const openInquiries = inquiries.filter(inquiry => inquiry.Status === 'open');
        const closedInquiries = inquiries.filter(inquiry => inquiry.Status === 'closed');

        // Render the EJS page and pass inquiries data
        res.render('clientinquiries', { openInquiries, closedInquiries });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        res.status(500).send('Internal Server Error');
    }
};




export const createInquiry = async (req, res) => {
    const token = req.session.token; // Retrieve token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const buyerId = decoded.userId; // Extract Buyer ID from token
        const email = decoded.email; // Extract Buyer email from token
        console.log('email:', email);

        console.log('Decoded Token:', decoded);
        console.log('Buyer ID:', buyerId);
        console.log('Request Body:', req.body);

        // Extract fields from request body
        const {
            PropertyID,
            message,
            inquiryType,
            contactMethod,
            visitDate,
           contactTime,
            moveInTimeline,
            financingStatus,
            additionalRequests
        } = req.body;

        // Check if Property exists
        const property = await Property.findByPk(PropertyID);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        // Save the inquiry
        const newInquiry = await Inquiry.create({
            BuyerID: buyerId,
            PropertyID,
            Message: message,
            InquiryType: inquiryType,
            ContactMethod: contactMethod,
            Email: email,
            VisitDate: visitDate || null,
            PreferredContactTime: contactTime || null,
            MoveInTimeline: moveInTimeline || null,
            FinancingStatus: financingStatus || null,
            AdditionalRequests: additionalRequests || null,
            Status: 'open'
        });

        res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
    } catch (error) {
        console.error('Error submitting inquiry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 


export const getAgentInquiries = async (req, res) => {

    const token = req.session.token; // Retrieve token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect if no token
    }

    try {
        // Assuming you have an agent's ID in session or request params
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const agentID = decoded.userId; // Extract Buyer ID from token

        console.log('Decoded Token:', decoded);
        

        // Fetch properties listed by the agent and the inquiries related to those properties
        const properties = await Property.findAll({
            where: { AgentID: agentID },
            include: [{
                model: Inquiry,
                required: false // Left join to include properties even if no inquiries
            }],
        });

        // Render the EJS template with the properties and related inquiries
        res.render('agentinquiries', { properties });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching inquiries.");
    }
};

export const updateStatus = async (req, res) => {
    const { inquiryID } = req.params;
    const { Status } = req.body;

    try {
        // Find the inquiry and update its status
        const inquiry = await Inquiry.findByPk(inquiryID);
        if (inquiry) {
            inquiry.Status = Status;
            await inquiry.save();
            // Redirect to the inquiries page after the update
            res.redirect('/api/inquiries/agent/inquiry');
        } else {
            res.status(404).send('Inquiry not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating inquiry status');
    }
};