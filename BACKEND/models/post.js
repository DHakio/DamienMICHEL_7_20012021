'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.hasMany(models.Comment, {onDelete: 'CASCADE', hooks: true});
      models.Post.belongsTo(models.User);
    }
  };
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
        key: 'id',
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};