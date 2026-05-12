const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // This is the URL of our frontend application. 
    credentials: true
}))

/*Using all the routes here*/
app.use('/api/auth', authRouter)

module.exports = app;