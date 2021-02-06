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
      allowNull: false,
      validate: {
      is: /^[a-zA-Z\- ']+$/
      }
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false ,
      validate: {
      is: /^[a-zA-Z\- ']+$/
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      validate: {
      isEmail: true
      }
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      is: /^[http://localhost:3000/images/avatars/]/,
      defaultValue: "http://localhost:3000/images/avatars/default.png",
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};