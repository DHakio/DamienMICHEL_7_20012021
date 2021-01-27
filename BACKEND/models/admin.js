'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    
    static associate(models) {
      models.Admin.belongsTo(models.User);
    }
  };
  Admin.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};