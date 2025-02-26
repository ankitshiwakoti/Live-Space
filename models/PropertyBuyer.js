// models/PropertyBuyer.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import RealEstateUser from './RealEstateUser.js';

const PropertyBuyer = sequelize.define('PropertyBuyer', {
    BuyerID: { type: DataTypes.INTEGER, primaryKey: true },
    ContactNumber: { type: DataTypes.STRING },
    PreferredContactMethod: { type: DataTypes.ENUM('email', 'phone', 'message') }
}, { timestamps: false });

PropertyBuyer.belongsTo(RealEstateUser, { foreignKey: 'BuyerID' });

export default PropertyBuyer;