import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust as per your config
import PropertyBuyer from './PropertyBuyer.js';
import Property from './Property.js';

const Inquiry = sequelize.define('Inquiry', {
    InquiryID: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    Message: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },

    // Inquiry Type: Buying, Renting, General
    InquiryType: { 
        type: DataTypes.ENUM('buy', 'rent', 'general'), 
        allowNull: false, 
        defaultValue: 'general' 
    },

    // Preferred Contact Method: Email, Phone
    ContactMethod: { 
        type: DataTypes.ENUM('email', 'phone'), 
        allowNull: false, 
        defaultValue: 'email' 
    },

    // Preferred Contact Time: Morning, Afternoon, Evening
    PreferredContactTime: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },

    // Email Address
    Email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: {
            isEmail: true
        }
    },

    // Move-in Timeline
    MoveInTimeline: { 
        type: DataTypes.ENUM('Immediately', '1-3 Months', '3-6 Months', '6+ Months'), 
        allowNull: true 
    },

    // Financing Status
    FinancingStatus: { 
        type: DataTypes.ENUM('Pre-approved', 'Looking for Loan', 'Cash Buyer'), 
        allowNull: true 
    },

    // Preferred Visit Date
    VisitDate: { 
        type: DataTypes.DATE, 
        allowNull: true 
    },

    // Additional Requests (Optional)
    AdditionalRequests: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },

    // Inquiry Status
    Status: { 
        type: DataTypes.ENUM('open', 'closed', 'pending'), 
        defaultValue: 'open' 
    },

}, { timestamps: true });

// Foreign Keys
Inquiry.belongsTo(PropertyBuyer, { foreignKey: 'BuyerID' });
Inquiry.belongsTo(Property, { foreignKey: 'PropertyID' });

export default Inquiry;
