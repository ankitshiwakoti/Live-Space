// models/Location.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Location = sequelize.define('Location', {
    LocationID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    AddressLine1: { type: DataTypes.STRING, allowNull: false },
    AddressLine2: { type: DataTypes.STRING },
    City: { type: DataTypes.STRING, allowNull: false },
    State: { type: DataTypes.STRING },
    Country: { type: DataTypes.STRING, allowNull: false },
    ZipCode: { type: DataTypes.STRING }
}, { timestamps: false });

export default Location;
