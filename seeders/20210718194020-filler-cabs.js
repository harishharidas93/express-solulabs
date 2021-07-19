'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cabs', [
      { cabId: 1, model: 'Altroz', manufacturer: 'Tata', currentAreaCode:1,onDuty:false },
      { cabId: 2, model: 'Harrier', manufacturer: 'Tata', currentAreaCode:1,onDuty:true },
      { cabId: 3, model: 'Jazz', manufacturer: 'Honda', currentAreaCode:4,onDuty:true },
      { cabId: 4, model: 'City', manufacturer: 'Honda', currentAreaCode:1,onDuty:true },
      { cabId: 5, model: 'Verna', manufacturer: 'Hyundai', currentAreaCode:1,onDuty:true },
      { cabId: 6, model: 'i20', manufacturer: 'Honda', currentAreaCode:1,onDuty:true },
      { cabId: 7, model: 'i10', manufacturer: 'Honda', currentAreaCode:1,onDuty:true },
      { cabId: 8, model: 'Asta', manufacturer: 'Honda', currentAreaCode:1,onDuty:true },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cabs', null, {});
  }
}