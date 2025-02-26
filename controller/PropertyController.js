import { Property, Location, PropertyAgent } from '../models/index.js';

const getAllProperties = async (req, res) => {
    try {
        const properties = await Property.findAll({
            include: [Location, PropertyAgent]
        });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPropertyById = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id, {
            include: [Location, PropertyAgent]
        });
        if (!property) return res.status(404).json({ message: 'Property not found' });
        res.json(property);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const { Title, Description, Price, LocationID, Type, ImageURL, AgentID } = req.body;
        const newProperty = await Property.create({ Title, Description, Price, LocationID, Type, ImageURL, AgentID });
        res.status(201).json(newProperty);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);
        if (!property) return res.status(404).json({ message: 'Property not found' });
        await property.destroy();
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllProperties, getPropertyById, createProperty, deleteProperty };
