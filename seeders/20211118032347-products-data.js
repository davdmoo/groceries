'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));

    products.forEach(product => {
      delete product.id;
      product.createdAt = new Date();
      product.updatedAt = new Date();
    })
    
    return queryInterface.bulkInsert('Products', products);
  },

  down: (queryInterface, Sequelize) => {

     return queryInterface.bulkDelete('Products', null, {});
  }
};
