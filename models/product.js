'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    
    static associate(models) {
      Product.belongsTo(models.Category)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    sold: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};