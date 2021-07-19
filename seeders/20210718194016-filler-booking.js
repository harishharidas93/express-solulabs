'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('bookings', [
      { bookingId: 1, userId: 1, destinationAreaCode:2,sourceAreaCode:1 },
      { bookingId: 2, userId: 1, destinationAreaCode:1,sourceAreaCode:4 },
      { bookingId: 3, userId: 1, destinationAreaCode:1,sourceAreaCode:2 },
      { bookingId: 4, userId: 2, destinationAreaCode:2,sourceAreaCode:1 },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('bookings', null, {});
  }
}
