'use strict';
const {
  Model
} = require('sequelize');
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
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.role = "user";
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};