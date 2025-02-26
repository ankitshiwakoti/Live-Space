// models/index.js (Initialize Sequelize and associations)
import sequelize from '../config/database.js';
import RealEstateUser from './RealEstateUser.js';
import PropertyAgent from './PropertyAgent.js';
import PropertyBuyer from './PropertyBuyer.js';
import Location from './Location.js';
import Property from './Property.js';
import Inquiry from './Inquiry.js';


// Define associations
RealEstateUser.hasOne(PropertyAgent, { foreignKey: 'AgentID' });
PropertyAgent.belongsTo(RealEstateUser, { foreignKey: 'AgentID' });

RealEstateUser.hasOne(PropertyBuyer, { foreignKey: 'BuyerID' });
PropertyBuyer.belongsTo(RealEstateUser, { foreignKey: 'BuyerID' });

Location.hasMany(Property, { foreignKey: 'LocationID' });
Property.belongsTo(Location, { foreignKey: 'LocationID' });

PropertyAgent.hasMany(Property, { foreignKey: 'AgentID' });
Property.belongsTo(PropertyAgent, { foreignKey: 'AgentID' });

PropertyBuyer.hasMany(Inquiry, { foreignKey: 'BuyerID' });
Inquiry.belongsTo(PropertyBuyer, { foreignKey: 'BuyerID' });

Property.hasMany(Inquiry, { foreignKey: 'PropertyID' });
Inquiry.belongsTo(Property, { foreignKey: 'PropertyID' });

const syncDatabase = async () => {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized!');
};

export { sequelize, syncDatabase, RealEstateUser, PropertyAgent, PropertyBuyer, Location, Property, Inquiry };
