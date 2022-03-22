const { Sequelize } = require('sequelize');
const { config } = require('../../../config/config');
const setupModels = require('../../../db/models');

const URI = config.DB_URL
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true
}

if(config.isProd){
  options.dialectOptions = {
    ssl:{
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(URI,options);

setupModels(sequelize)

//sequelize.sync(); \Extremadamente peligroso para producción, ya que hora y reemplaza la base de datos anterior

module.exports = sequelize;
