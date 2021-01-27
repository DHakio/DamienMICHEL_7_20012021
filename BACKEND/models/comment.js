'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User);
      models.Comment.belongsTo(models.Topic);
    }
  };
  Comment.init({
    content: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    TopicId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};