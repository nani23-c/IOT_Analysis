// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch data from the external API
app.get('/data', async (req, res) => {
    try {
        const fetch = await import('node-fetch');
        const response = await fetch.default("https://ov9gqjv2nk.execute-api.us-east-1.amazonaws.com/test/retrievereceipthistory");
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
