'use strict';

const {encrypt} = require('../helpers/bcrypt.js')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model{}

  User.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `Email required`
        },
        isEmail: {
          args: true,
          msg: `Must be an email`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        len: [6, 25]
      }
    }
  },  {
    hooks: {
      beforeCreate(user) {
        user.password = encrypt(user.password);
        return new Promise((resolve, reject) => {
          User.findOne({
            where: {
              email: user.email
            }
          })
            .then(result => {
              if (result) {
                const err = `Email Already Exists`;
                reject(err);
              } else {
                resolve(user);
              }
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    },
    sequelize,
    modelName: 'User'
  });
    
  User.associate = function(models) {
  };
  return User;
};