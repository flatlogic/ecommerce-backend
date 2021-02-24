'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require("../db.config")[env];
const db = {};

let sequelize;
console.log(env);
// if (config.use_env_variable) {
  sequelize = new Sequelize("postgres://wyiqlzycpemgin:20fc8b54c9eedd170a0ca447498ee2c67df82b3db36214b0601bba1cfd2572f4@ec2-3-222-11-129.compute-1.amazonaws.com:5432/d5g3e3ke0kepos");
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
