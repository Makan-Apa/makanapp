const router = require('express').Router();
const userRouter = require('./user.js');
const menuRouter = require('./menu');
const authentication = require('../middlewares/authentication.js');


router.get('/', () => {
  console.log('Welcome to MakanApp')
});
router.use('/', userRouter);
router.use(authentication)
router.get('/whats-your-menu', menuRouter)

module.exports = router;