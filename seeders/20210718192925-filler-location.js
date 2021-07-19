'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('locationlookups', [
      { location: 'Mumbai South', areaCode: 1 },
      { location: 'Mumbai North', areaCode: 2 },
      { location: 'Andheri' , areaCode: 3 },
      { location: 'Ambernath' , areaCode: 4 },
      { location: 'Mumbai West' , areaCode: 5 }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('locationlookups', null, {});
  }
}