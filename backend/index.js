
const express = require('express');
const app = express();
const userRouter = require('./router');
const cors = require('cors');
require('dotenv').config();

const database = require('./createDatabase');

app.use(express.json());
app.use(cors());
app.use(userRouter);



app.listen(5050,
    () => {
        console.log('Server running on http://localhost:5050');
    });

