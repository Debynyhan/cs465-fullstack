const fs = require('fs');
const path = require('path');

// Define the path to the JSON file
const newsFilePath = path.join(__dirname, '../data/news.json');

// Function to read news data from the JSON file
const getNewsData = () => {
    try {
        const newsData = JSON.parse(fs.readFileSync(newsFilePath, 'utf8'));
        return newsData;
    } catch (error) {
        console.error('Error reading news data:', error);
        return [];
    }
};

// Controller function to handle the GET request for news
const getNews = (req, res) => {
    // Read news data from the JSON file
    const newsData = getNewsData();

    // Render the 'news' template with the news data
    res.render('news', {
        title: 'News - Travlr Getaways Website Template',
        newsData: newsData
    });
};

module.exports = {
    getNews
};

// const express = require('express');
// const controller = require('../controllers/news');


// const router = express.Router();

// /* GET rooms page. */
// router.get('/', controller.news);

// module.exports = router;
