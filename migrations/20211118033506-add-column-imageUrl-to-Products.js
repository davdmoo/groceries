'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.addColumn('Products', 'imageUrl', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    
     return queryInterface.removeColumn('Products', 'imageUrl')
  }
};
