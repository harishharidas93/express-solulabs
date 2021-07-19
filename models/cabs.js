'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cabs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cabs.hasMany(models.locationLookup)
    }
  };
  cabs.init({
    cabId: DataTypes.INTEGER,
    model: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    currentAreaCode: DataTypes.INTEGER,
    onDuty: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'cabs',
  });
  return cabs;
};