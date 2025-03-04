// // models/Inquiry.js
// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import PropertyBuyer from './PropertyBuyer.js';
// import Property from './Property.js';

// const Inquiry = sequelize.define('Inquiry', {
//     InquiryID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     Message: { type: DataTypes.TEXT, allowNull: false },
//     Status: { type: DataTypes.ENUM('open', 'closed', 'pending'), defaultValue: 'open' }
// }, { timestamps: true });

// Inquiry.belongsTo(PropertyBuyer, { foreignKey: 'BuyerID' });
// Inquiry.belongsTo(Property, { foreignKey: 'PropertyID' });

// export default Inquiry;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import PropertyBuyer from './PropertyBuyer.js';
import Property from './Property.js';

const Inquiry = sequelize.define('Inquiry', {
    InquiryID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    Message: { type: DataTypes.TEXT, allowNull: false },
    InquiryType: { 
        type: DataTypes.ENUM('buy', 'rent', 'general'), 
        allowNull: false, 
        defaultValue: 'general' 
    }, // Specifies the type of inquiry
    ContactMethod: { 
        type: DataTypes.ENUM('phone', 'email'), 
        allowNull: false, 
        defaultValue: 'email' 
    }, // Preferred way to be contacted
    VisitDate: { type: DataTypes.DATE, allowNull: true }, // Optional date for a property visit
    Status: { 
        type: DataTypes.ENUM('open', 'closed', 'pending'), 
        defaultValue: 'open' 
    }, // Inquiry status
}, { timestamps: true });

Inquiry.belongsTo(PropertyBuyer, { foreignKey: 'BuyerID' });
Inquiry.belongsTo(Property, { foreignKey: 'PropertyID' });

export default Inquiry;
