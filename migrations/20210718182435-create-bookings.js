'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Bookings', {
      bookingId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'userlists'
          },
          key: 'userId'
        }
      },
      destinationAreaCode: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'locationlookups'
          },
          key: 'areaCode'
        }
      },
      sourceAreaCode: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'locationlookups'
          },
          key: 'areaCode'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Bookings');
  }
};