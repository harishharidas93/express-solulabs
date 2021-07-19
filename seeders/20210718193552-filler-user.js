'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('userlists', [
      { userId: 1, username: 'harish', password:'harish',currentAreaCode:1 },
      { userId: 2, username: 'test', password:'test',currentAreaCode:4 }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('userlists', null, {});
  }
}
