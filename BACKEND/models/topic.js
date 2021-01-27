'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    static associate(models) {
      models.Topic.hasMany(models.Comment);
      models.Topic.belongsTo(models.User);
    }
  };
  Topic.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Topic',
  });
  return Topic;
};