import Location from '../models/Location.js';
import Property from '../models/Property.js';
import jwt from 'jsonwebtoken';
import PropertyAgent from '../models/PropertyAgent.js';

export const getAddProperty = async (req, res) => {
    try {
        // Render the form for adding a property
        res.render('addProperty');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

export const postAddProperty = async (req, res) => {
    const token = req.session.token; // Retrieve the token from session
    try {
        const { title, description, price, type, imageURL, addressLine1, addressLine2, city, state, country, zipCode } = req.body;

        // Create location from the form data
        const location = await Location.create({
            AddressLine1: addressLine1,
            AddressLine2: addressLine2,
            City: city,
            State: state,
            Country: country,
            ZipCode: zipCode,
        });

        // Get AgentID from session
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
                // Extract UserID from the decoded token (assuming `decoded` contains `UserID`)
                const agentID = decoded.userId; 
                console.log('agent ID:', agentID);

                const agent = await PropertyAgent.findOne({ where: { AgentID: agentID } });
                if (!agent) {
                    return res.status(400).send('Agent not found');
                }

        // Create property associated with the location and agent
        await Property.create({
            Title: title,
            Description: description,
            Price: price,
            Type: type,
            ImageURL: imageURL,
            LocationID: location.LocationID,
            AgentID: agentID,
        });

        // Redirect to properties page
        res.redirect('/admin/properties');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};
