// models/Property.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Location from './Location.js';
import PropertyAgent from './PropertyAgent.js';

const Property = sequelize.define('Property', {
    PropertyID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Title: { type: DataTypes.STRING, allowNull: false },
    Description: { type: DataTypes.TEXT },
    Price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    Type: { type: DataTypes.ENUM('house', 'apartment', 'condo', 'commercial'), allowNull: false },
    ImageURL: { type: DataTypes.STRING }
}, { timestamps: true });

Property.belongsTo(Location, { foreignKey: 'LocationID' });
Property.belongsTo(PropertyAgent, { foreignKey: 'AgentID' });

export default Property;
