const express = require('express');
const fs = require('fs');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'local';


// Load config from JSON file
// const config = JSON.parse(fs.readFileSync('postgres/config/config.local.json', 'utf8'));
const config = JSON.parse(fs.readFileSync(`postgres/config/config.${env}.json`, 'utf8'));
const pool = new Pool(config.poolConfig);

app.use(express.static('public'));

// API endpoint to get a random question
app.get('/api/question', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM questions ORDER BY RANDOM() LIMIT 1');
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});