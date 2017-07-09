const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(module.filename);
const dbConfig  = require('config').database;

console.log(dbConfig);

let db = {};

let sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.DB_USERNAME, dbConfig.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;