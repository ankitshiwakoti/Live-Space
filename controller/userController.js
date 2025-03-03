
import Property from '../models/Property.js'; // Import the Property model
import PropertyAgent from '../models/PropertyAgent.js'; // Import the PropertyAgent model
import Location from '../models/Location.js'; // Import the Location model

export const getAllProperties = async (req, res) => {
    try {
        // Fetch all properties from the database
        const properties = await Property.findAll({
            include: [
                { model: PropertyAgent, attributes: ['AgentID'] },
                { model: Location, attributes: ['LocationID', 'City', 'State'] }
            ]
        });
        console.log('Properties:', properties);
        console.log("user ko ma ailay xu ");
        // Render the dashboard with properties
        res.render('clientdashboard', { properties });
    } catch (error) {
        console.error("Error fetching properties: ", error);
        res.status(500).send('Server error');
    }
};