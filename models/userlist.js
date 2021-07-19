'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserList.hasMany(models.Bookings, {
        onDelete: 'cascade'
      })
    }
  };
  UserList.init({
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    currentAreaCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserList',
  });
  return UserList;
};