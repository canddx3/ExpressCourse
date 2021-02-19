(function () {
  'use strict';
}());

module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define(
    'users',
    {
      UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      FirstName: DataTypes.STRING,
      LastName: DataTypes.STRING,
      Email: {
        type: DataTypes.STRING,
        unique: true
      },
      Username: {
        type: DataTypes.STRING,
        unique: true
      },
      Password: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      Admin: {
        type: DataTypes.STRING,
        unique: true
      },
      Deleted: DataTypes.STRING
    },
    {}
  );

  return users;
};