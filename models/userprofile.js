'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    
    static associate(models) {
      UserProfile.belongsTo(models.User)
    }
  };
  UserProfile.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {

    // hooks: {
    //   beforeCreate: (user) => {
    //     user.UserId = 1
    //   }
    // },
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};