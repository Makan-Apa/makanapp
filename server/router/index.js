const router = require('express').Router();
const userRouter = require('./user.js');

router.get('/', () => {
  console.log('Welcome to MakanApp')
});
router.use('/', userRouter);

module.exports = router;