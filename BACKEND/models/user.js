'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      models.User.hasMany(models.Post, {onDelete: 'CASCADE'});
      models.User.hasMany(models.Comment, {onDelete: 'CASCADE'});
      models.User.hasOne(models.Admin, {onDelete: 'CASCADE'})
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