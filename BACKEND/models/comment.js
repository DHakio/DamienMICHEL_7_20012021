'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User);
      models.Comment.belongsTo(models.Post);
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      hook: true,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    PostId: {
      type:DataTypes.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      hook: true,
      references: {
        model: 'Posts',
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};