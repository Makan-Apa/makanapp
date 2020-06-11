const router = require('express').Router();
const MenuController = require('../controller/MenuController.js');

router.get('/whats-your-menu', MenuController.randomMenu)

module.exports = router