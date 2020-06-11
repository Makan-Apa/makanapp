const bcrypt = require('bcryptjs')

module.exports = {
  encrypt: (password) => {
    const salt = bcrypt.genSaltSync(5);
    return bcrypt.hashSync(password, salt);
  },
  compare: (password, hash) => {
    return bcrypt.compareSync(password, hash);
  }
}