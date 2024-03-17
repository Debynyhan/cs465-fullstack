const fs = require('fs');
const roomsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/* Get travel view */
const rooms = (req, res) => {
    res.render('rooms', {
        title: 'Rooms - Travlr Getaways Website Template',
        roomsData: roomsData,
        currentPage: "rooms"
    });

};

module.exports = {
    rooms
};
