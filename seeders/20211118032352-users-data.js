'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let users = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));

    users.forEach(user => {
      delete user.id;
      user.createdAt = new Date();
      user.updatedAt = new Date();
      user.role = "user";
    })

     return queryInterface.bulkInsert('Users', users);

  },

  down: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkDelete('Users', null, {});
  }
};
