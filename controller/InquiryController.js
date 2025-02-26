import { Inquiry, PropertyBuyer, Property } from '../models/index.js';

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.findAll({
            include: [PropertyBuyer, Property]
        });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createInquiry = async (req, res) => {
    try {
        const { buyerID, propertyID, message } = req.body;
        const newInquiry = await Inquiry.create({ buyerID, propertyID, message });
        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllInquiries, createInquiry };
