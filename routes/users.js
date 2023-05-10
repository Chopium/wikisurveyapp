const express = require('express');
const router = express.Router();
const fs = require('fs');
const { Pool } = require('pg');

// Load config from JSON file
const env = process.env.NODE_ENV || 'local';
const config = JSON.parse(fs.readFileSync(`postgres/config.${env}.json`, 'utf8'));
const pool = new Pool(config.poolConfig);

// Create a user
router.post('/', async (req, res) => {
  try {
    const { demographics } = req.body;
    
    // Ensure demographics is provided
    if (!demographics) {
      return res.status(400).json({ message: 'Demographics are required' });
    }
    const newUser = await pool.query(
        'INSERT INTO users (demographics) VALUES ($1) RETURNING id',
        [demographics]
      );
      res.status(201).json({ id: newUser.rows[0].id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error creating user' });
    }
});

module.exports = router;
