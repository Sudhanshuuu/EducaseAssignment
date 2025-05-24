const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectMongoDb = require('./connection');
const port = 3001;

const schoolRoute = require('./routes/school');

dotenv.config();
app.use(cors());
app.use(express.json());

connectMongoDb(process.env.MONGO_URI);

app.use('/', schoolRoute);

app.listen(3001, () => { console.log(`Your server is running at port at ${port}`) });