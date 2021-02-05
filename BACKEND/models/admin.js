'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    
    static associate(models) {
      models.Admin.belongsTo(models.User);
    }
  };
  Admin.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      onDelete: 'CASCADE',
      hook: true,
      references: {
        model: "Users",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};