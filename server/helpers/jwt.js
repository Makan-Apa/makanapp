const jwt = require('jsonwebtoken');

function userToken(payload) {
  console.log(process.env.SECRET)
  return jwt.sign(payload, process.env.SECRET);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET);
}

module.exports = {
  userToken,
  verifyToken
}