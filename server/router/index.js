const router = require('express').Router();
const userRouter = require('./user.js');
const weather = require('./weather')
const dataRouter = require('./data.js');
const menuRouter = require('./menu');
const authentication = require('../middlewares/authentication.js');

router.get('/', () => {
  console.log('Welcome to MakanApp')
});
router.use('/', userRouter);
router.use('/', weather)
router.use('/data', dataRouter);
router.use(authentication)
router.get('/whats-your-menu', menuRouter)

module.exports = router;