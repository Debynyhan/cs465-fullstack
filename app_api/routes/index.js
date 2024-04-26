const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require("express-jwt");

// Setup JWT midddleware
const auth = jwt({
    secret: process.env.JWT_SECRET,
   
    algorithms: ['HS256'] // Make sure to specify the algorithm
});


// This is where we import the controllers for the routes
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');

// Public routes
router.route('/login').post(authController.login);
router.route('/register').post(authController.register);  


// Protected routes
// Define route for our trips endpoint
router.route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip); // Post Method routes tripAddTrips

// Get Method routes tripsFindByCode - requires parameters
router.route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip); // Put Method routes trip

module.exports = router;    