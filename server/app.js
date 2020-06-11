
require('dotenv').config()   

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./router');
const errorHandler = require('./middlewares/errorHandler.js')

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`App is connected to port ${port}`);
});