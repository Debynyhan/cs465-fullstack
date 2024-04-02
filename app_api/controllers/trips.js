const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// Get: /trip - lists all the trips
// Regardless of outcome, response must include HTML status 
// and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec(); // Execute the query


    // Uncomment the following line to show results of query
    // console.log(q);

    if (!q) { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

// Get: /trip - lists all the trips
// Regardless of outcome, response must include HTML status 
// and JSON message to the requesting client
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode }) // No filter, return all records
        .exec(); // Execute the query


    // Uncomment the following line to show results of query
    // console.log(q);

    if (!q) { // Database returned no data
        return res
            .status(404)
            .json(err);
    } else { // Return resulting trip list
        return res
            .status(200)
            .json(q);
    }

};

const tripsAddTrip = async (req, res) => {
    try {
        const trip = await Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(trip);
    } catch (err) {
        return res.status(400).json(err);
    }
};

// PUT: /trips/:tripCode - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    try {
        const q = await Model.findOneAndUpdate({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });
        return res.status(201).json(q);
    } catch (err) {
        return res.status(400).json(err);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};