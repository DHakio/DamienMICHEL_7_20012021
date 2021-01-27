'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Topic);
      models.User.hasMany(models.Comment);
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING, 
      validate: {
      is: /^[a-zA-Z\- ']+$/
      }
    },
    first_name: {
      type: DataTypes.STRING, 
      validate: {
      is: /^[a-zA-Z\- ']+$/
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING, 
      validate: {
      isEmail: true
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};