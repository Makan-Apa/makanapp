const {verifyToken} = require('../helpers/jwt.js');
const {User} = require('../models');

function authentication(req, res, next) {
  let token = req.headers.token;
  console.log(token);

  try {
    let check = verifyToken(token);
    let {id} = check;
    User.findByPk(id)
      .then(result => {
        if (result) {
          req.UserId = id;
          next();
        } else {
          res.status(401).json({
            message: 'Please login first'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
  catch(error) {
    res.status(401).json({error: error.message});
  }
}

module.exports = authentication;