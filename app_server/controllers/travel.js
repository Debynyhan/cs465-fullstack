const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

/* Get travel view */
const travel = (req, res) => {

    // Set isTravel to true to indicate that the Travel page is selected
    const isTravel = true;

    res.render('travel', {
        title: 'Travel Getaway',
        trips: trips,
        currentPage: "travel" // Pass isTravel to the view
    });

};

module.exports = {
    travel
};


// /* Get travel view */
// const travel = (req, res) => {
//     res.render('travel', { title: 'Travlr Getaways' });
// };

// module.exports = {
//     travel
// };