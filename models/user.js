'use strict';

module.exports = function (sequelize, DataTypes) {

  function findOrCreateWithEmail(email) {
    return User.findOrCreate({
      where: {
        email: email
      },
      default: {}
    });
  }

  let User = sequelize.define('user', {
    username: DataTypes.STRING(256),
    password: DataTypes.STRING(256),
    email: DataTypes.STRING(256),
    avatar: DataTypes.STRING(256)
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user',
    timestamps: false
  });

  return User;
};
