const router = require('express').Router();
const userRouter = require('./user.js');
const weather = require('./weather')

router.get('/', () => {
  console.log('Welcome to MakanApp')
});
router.use('/', userRouter);
router.use('/', weather)

module.exports = router;