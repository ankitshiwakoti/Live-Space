// models/RealEstateUser.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const RealEstateUser = sequelize.define('RealEstateUser', {
    UserID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Name: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, unique: true, allowNull: false },
    Password: { type: DataTypes.STRING, allowNull: false },
    TwoFASecret: { type: DataTypes.STRING, allowNull: true },
    Role: { type: DataTypes.ENUM('agent', 'client'), allowNull: false }
}, { timestamps: true });

export default RealEstateUser; 