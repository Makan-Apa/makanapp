const router = require('express').Router();
const DataController = require('../controller/dataController.js');
const authentication = require('../middlewares/authentication.js')

router.use(authentication);
router.get('/restaurant', DataController.fetchRestaurant);
router.get('/weather', DataController.fetchWeather);

module.exports = router;