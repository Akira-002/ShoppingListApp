'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {id: '1', name: 'オレンジジュース'},
      {id: '2', name: '炭酸水'},
      {id: '3', name: 'コーヒー豆'},
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  }
};
