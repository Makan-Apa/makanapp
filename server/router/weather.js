const router = require('express').Router();
const WeatherController = require('../controller/WeatherController');

router.get('/cuaca', WeatherController.meta);

module.exports = router;