'use strict'

function errorHandler(err, req, res , next) {
  console.log(err)
  if (err.name == 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Please login first'
    })
  } else if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: err.message
    })
  } else {
    res.status(err.code || 500).json({
      error: err.message
    })
  }
}

module.exports = errorHandler;