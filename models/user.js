'use strict';

module.exports = function (sequelize, DataTypes) {

  function findOrCreateWithUsername(username) {
    return User.findOrCreate({
      where: {
        username: username
      },
      default: {}
    });
  }

  let User = sequelize.define('user', {
    username: DataTypes.STRING(256),
    password: DataTypes.STRING(256)
  }, {
    underscored: true,
    freezeTableName: true,
    tableName: 'user',
    timestamps: false
  });

  return User;
};
