if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()   
}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`App is connected to port ${port}`);
});