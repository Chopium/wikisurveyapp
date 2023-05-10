const express = require('express');
const fs = require('fs');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');
app.use(cors());

// Import routers
console.log("loading api libs...");
const usersRouter = require('./routes/users');
// const questionsRouter = require('./routes/questions');
// const hooksRouter = require('./routes/hooks');
// const answersRouter = require('./routes/answers');
// const commentsRouter = require('./routes/comments');
// const hookResponsesRouter = require('./routes/hook_responses');
// const votesRouter = require('./routes/votes');

console.log("adding json support for express");
app.use(express.json());

// Use routers for each resource
console.log("creating api routes");
app.use('/users', usersRouter);
// app.use('/questions', questionsRouter);
// app.use('/hooks', hooksRouter);
// app.use('/answers', answersRouter);
// app.use('/comments', commentsRouter);
// app.use('/hook_responses', hookResponsesRouter);
// app.use('/votes', votesRouter);

//environment variables
console.log("loading environment variables");
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'local';

// Load config from JSON file
console.log(`Attempting to load postgresql config file: ${env}`);
const config = JSON.parse(fs.readFileSync(`postgres/config.${env}.json`, 'utf8'));
const pool = new Pool(config.poolConfig);

console.log(`Express now serving public folder`);
app.use(express.static('public'));



// Test endpoint
app.get('/api/test', (req, res) => {
    console.log('Received request for /api/test');
    res.json({ message: 'Test endpoint works!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
