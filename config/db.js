const { Sequelize } = require('sequelize');
const winston = require('../middlewares/winston.middleware');
const config = require('./config');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USERNAME,
  config.DB_PASSWORD,
  {
    host: config.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
    define: {
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const connectMySQL = () => {
  sequelize.authenticate()
    .then(() => winston.info(`MySQL Database connected...`.yellow.bold))
    .catch(err => winston.error(`ERROR: ${err}`));
};

module.exports = {
  sequelize,
  Sequelize,
  connectMySQL
};
