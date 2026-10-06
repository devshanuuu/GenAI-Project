const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://gen-ai-project-mauve.vercel.app"
    ],
    credentials: true
}));

/*Require all the routes*/ 
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

/*Using all the routes here*/
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;