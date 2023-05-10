const express = require('express');
const fs = require('fs');
// const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'local';

// console.log(`Attempting to load config file`);
// console.log(env);
// // Load config from JSON file
// const config = JSON.parse(fs.readFileSync(`postgres/config/config.${env}.json`, 'utf8'));
// console.log(`Loaded config for environment: ${env}`, config);

// const pool = new Pool(config.poolConfig);

app.use(express.static('public'));

// // API endpoint to get a random question
// app.get('/api/question', async (req, res) => {
//     try {
//         console.log('Received request for /api/question');
//         const result = await pool.query('SELECT * FROM questions ORDER BY RANDOM() LIMIT 1');
//         console.log('Fetched question:', result.rows[0]);
//         res.json(result.rows[0]);
//     } catch (err) {
//         console.error('Error fetching question:', err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// // Test endpoint
// app.get('/api/test', (req, res) => {
//     console.log('Received request for /api/test');
//     res.json({ message: 'Test endpoint works!' });
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
