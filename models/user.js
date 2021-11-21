'use strict';

const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      User.hasOne(models.UserProfile)
    }

    formattedName(gender, name) {
      switch (gender) {
        case 'Male':
          name = `Mr. ${name}`;
          break;
        case 'Female':
          name = `Ms. ${name}`;
          break;
      }

      return name;
    }
  };
  User.init({
    name: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Masukkan nama`
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Masukkan email`
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Masukkan password`
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Masukkan role`
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user,options) => {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password , salt);

        user.password = hash
      },
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};