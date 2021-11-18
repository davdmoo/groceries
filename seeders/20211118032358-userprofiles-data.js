'use strict';
const fs = require('fs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let userProfiles = JSON.parse(fs.readFileSync('./data/userprofiles.json', 'utf-8'));

    userProfiles.forEach(profile => {
      delete profile.id;
      profile.createdAt = new Date();
      profile.updatedAt = new Date();
    })

     return queryInterface.bulkInsert('UserProfiles', userProfiles);
  },

  down: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkDelete('UserProfiles', null, {});

  }
};
