/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    PostId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PostTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    PostBody: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UserId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'posts'
  });
};
