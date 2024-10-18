const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Fuse = require('fuse.js');
const faqs = require('./data'); // Make sure this points to your data file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files (like index.html)
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Search endpoint
app.post('/api/search', (req, res) => {
    console.log('Request body:', req.body); // Log the whole request body
    const query = req.body.query;
    console.log('Search query:', query); // Log the specific query

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'A valid query is required' });
    }

    const options = {
        includeScore: true,
        keys: ['question', 'answer', 'category']
    };

    try {
        const fuse = new Fuse(faqs, options);
        const results = fuse.search(query);
        console.log('Search results:', results);
        res.json(results.map(result => result.item));
    } catch (error) {
        console.error('Error during search:', error);
        res.status(500).json({ error: 'An error occurred while searching.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
app.get('/api/faqs', (req, res) => {
    res.json(faqs); // Send the flattened FAQs
});