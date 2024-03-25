const express = require('express');
const router = express.Router();

// This is where we import the controllers for the routes
const tripsController = require('../controllers/trips');


// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList); // Get Method routes tripList


// Get Method routes tripsFindByCode - requires parameters
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode); // Get Method routes tripList    

module.exports = router;    