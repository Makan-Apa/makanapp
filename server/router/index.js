const router = require('express').Router();
const userRouter = require('./user.js');
const dataRouter = require('./data.js');

router.get('/', () => {
  console.log('Welcome to MakanApp')
});
router.use('/', userRouter);
router.use('/data', dataRouter);

module.exports = router;