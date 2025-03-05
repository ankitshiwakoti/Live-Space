import {  PropertyBuyer, RealEstateUser } from '../models/index.js';
import sequelize from '../config/database.js';

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

describe('PropertyBuyer Model', () => {
    it('should create a new property buyer', async () => {
        const user = await RealEstateUser.create({
            Name: 'Buyer John',
            Email: 'buyer.john@example.com',
            Password: 'password123',
            Role: 'client',
        });

        const buyer = await PropertyBuyer.create({
            BuyerID: user.UserID,
            ContactNumber: '1234567890',
            PreferredContactMethod: 'email',
        });

        expect(buyer.BuyerID).toBe(user.UserID);
        expect(buyer.ContactNumber).toBe('1234567890');
        expect(buyer.PreferredContactMethod).toBe('email');
    });

    it('should associate with RealEstateUser model', async () => {
        const user = await RealEstateUser.create({
            Name: 'Buyer Alice',
            Email: 'buyer.alice@example.com',
            Password: 'password123',
            Role: 'client',
        });

        const buyer = await PropertyBuyer.create({
            BuyerID: user.UserID,
            ContactNumber: '9876543210',
            PreferredContactMethod: 'phone',
        });

        const foundBuyer = await PropertyBuyer.findOne({
            where: { BuyerID: user.UserID },
            include: RealEstateUser,
        });

        expect(foundBuyer.RealEstateUser.Name).toBe('Buyer Alice');
    });
});

afterAll(async () => {
    await sequelize.close();
});
