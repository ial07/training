import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import { readdirSync } from 'fs'

const morgan = require('morgan')
require('dotenv').config()

const app = express();

// database
const Url = process.env.DATABASE
mongoose.connect(Url)
    .then(() => console.log("DB CONNECTED"))
    .catch(err => console.log("DB CONNECT ERROR", err))

//Middlewares
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ['http://localhost:3000'],
}));

//outoload Routes
readdirSync('./routes/').map((r) => app.use('/api', require(`./routes/${r}`)))

// PORT Listnen
const port = process.env.PORT || 8000
app.listen(port, console.log(`Server Is Running on port ${port}`))