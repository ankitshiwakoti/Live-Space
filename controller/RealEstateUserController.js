import { RealEstateUser } from '../models/index.js';

const getAllUsers = async (req, res) => {
    try {
        console.log('GET /api/users route hit');
        const users = await RealEstateUser.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await RealEstateUser.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        console.log("Received Data:", req.body); // Debugging
        const { Name, Email, Password, Role } = req.body;
        const newUser = await RealEstateUser.create({ Name, Email, Password, Role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await RealEstateUser.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllUsers, getUserById, createUser, deleteUser };
