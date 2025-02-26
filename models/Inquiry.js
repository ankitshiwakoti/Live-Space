// models/Inquiry.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import PropertyBuyer from './PropertyBuyer.js';
import Property from './Property.js';

const Inquiry = sequelize.define('Inquiry', {
    InquiryID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Message: { type: DataTypes.TEXT, allowNull: false },
    Status: { type: DataTypes.ENUM('open', 'closed', 'pending'), defaultValue: 'open' }
}, { timestamps: true });

Inquiry.belongsTo(PropertyBuyer, { foreignKey: 'BuyerID' });
Inquiry.belongsTo(Property, { foreignKey: 'PropertyID' });

export default Inquiry;