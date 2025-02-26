// models/PropertyAgent.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import RealEstateUser from './RealEstateUser.js';

const PropertyAgent = sequelize.define('PropertyAgent', {
    AgentID: { type: DataTypes.INTEGER, primaryKey: true },
    LicenseNumber: { type: DataTypes.STRING },
    ContactNumber: { type: DataTypes.STRING }
}, { timestamps: false });

PropertyAgent.belongsTo(RealEstateUser, { foreignKey: 'AgentID' });

export default PropertyAgent;