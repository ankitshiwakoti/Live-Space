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
        res.status(500).send('Server Error ho ea');
    }
};

// export const postAddProperty = async (req, res) => {
//     const token = req.session.token; // Retrieve the token from session
   
//     if (!token) {
//         return res.redirect('/api/users/login'); // Redirect to login if no token
//     }
//     try {
//         const { title, description, price, type, imageURL, addressLine1, addressLine2, city, state, country, zipCode } = req.body;

//         // Create location from the form data
//         const location = await Location.create({
//             AddressLine1: addressLine1,
//             AddressLine2: addressLine2,
//             City: city,
//             State: state,
//             Country: country,
//             ZipCode: zipCode,
//         });

//         // Get AgentID from session
//           const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
//                 // Extract UserID from the decoded token (assuming `decoded` contains `UserID`)
//                 const agentID = decoded.userId; 
//                 console.log('agent ID:', agentID);

//                 const agent = await PropertyAgent.findOne({ where: { AgentID: agentID } });
//                 if (!agent) {
//                     return res.status(400).send('Agent not found');
//                 }

//         // Create property associated with the location and agent
//         await Property.create({
//             Title: title,
//             Description: description,
//             Price: price,
//             Type: type,
//             ImageURL: imageURL,
//             LocationID: location.LocationID,
//             AgentID: agentID,
//         });

//         // Redirect to properties page
//         res.redirect('/admin/properties');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// };

export const postAddProperty = async (req, res) => {
    const token = req.session.token; // Retrieve the token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect to login if no token
    }

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

        // Get AgentID from session token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const agentID = decoded.userId; // Extract UserID from token

        console.log('Agent ID:', agentID);

        // Validate if agent exists
        const agent = await PropertyAgent.findOne({ where: { AgentID: agentID } });
        if (!agent) {
            return res.status(400).send('Agent not found');
        }

        // Create the property
        const property = await Property.create({
            Title: title,
            Description: description,
            Price: price,
            Type: type,
            ImageURL: imageURL,
            LocationID: location.LocationID, // or location.id (if Sequelize auto-generates `id`)
            AgentID: agentID,
        });

        console.log('New Property Created:', property);

        // Redirect to properties page after successful addition
        res.redirect('/api/users/dashboard');
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).send('Server Error');
    }
};

export const editProperty = async (req, res) => {
    console.log('Edit Property:', req.params.id);
    try {
        const property = await Property.findByPk(req.params.id, {
            include: [{ model: Location, attributes: ['ZipCode','AddressLine2','AddressLine1','City', 'State', 'Country'] }]
        });

        if (!property) {
            return res.status(404).send('Property not found');
        }

        res.render('updateproperty', { property }); // Render edit form with property details
    } catch (error) {
        console.error('Error fetching property for edit:', error);
        res.redirect('/dashboard');
    }
};


export const updateProperty = async (req, res) => {
    console.log('Update Property:', req.params.id);

    const token = req.session.token; // Retrieve the token from session

    if (!token) {
        return res.redirect('/api/users/login'); // Redirect to login if no token
    }

    try {
        const { 
            title, description, price, type, imageURL, addressLine1, addressLine2, city, state, country, zipCode
        } = req.body;

        // Get AgentID from session token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const agentID = decoded.userId; // Extract UserID from token

        console.log('Agent ID:', agentID);

        // Validate if agent exists
        const agent = await PropertyAgent.findOne({ where: { AgentID: agentID } });
        if (!agent) {
            return res.status(400).send('Agent not found');
        }


        // Find property with its associated location
        const property = await Property.findByPk(req.params.id, {
            include: [{ model: Location, attributes: ['LocationID','ZipCode','AddressLine2','AddressLine1','City', 'State', 'Country'] }]
        });

        console.log('Property update ko lagii:', property);

        if (!property) {
            return res.status(404).send('Property not found');
        }

        // Update property details
        await property.update({ 
            Title: title,
            Description: description,
            Price: price,
            Type: type,
            ImageURL: imageURL,
            LocationID: property.Location.LocationID, // or location.id (if Sequelize auto-generates `id`)
            AgentID: agentID,
        });

        // Update location details
        if (property.Location) {
            await property.Location.update({
                AddressLine1: addressLine1,
                AddressLine2: addressLine2,
                ZipCode: zipCode,
                City: city,
                State: state,
                Country: country
            });
        }
        console.log('Property update vayoo');
        res.redirect('/api/users/dashboard'); // Redirect to dashboard after update
    } catch (error) {
        console.error('Error updating property:', error);
        res.redirect('/login');
    }
};


export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findByPk(req.params.id);

        if (!property) {
            return res.status(404).send('Property not found');
        }

        await property.destroy(); // Delete the property

        res.redirect('/api/users/dashboard'); // Redirect after deletion
    } catch (error) {
        console.error('Error deleting property:', error);
        res.redirect('/dashboard');
    }
};