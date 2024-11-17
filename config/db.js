// const { Sequelize } = require('sequelize');
// const winston = require('../middlewares/winston.middleware');
// const config = require('./config');

// const sequelize = new Sequelize(
//   config.DB_NAME,
//   config.DB_USERNAME,
//   config.DB_PASSWORD,
//   {
//     host: config.DB_HOST,
//     dialect: 'mysql',
//     logging: false,
//     pool: {
//       max: 20,
//       min: 0,
//       idle: 10000,
//       acquire: 30000,
//     },
//     define: {
//       underscored: true,
//       createdAt: 'created_at',
//       updatedAt: 'updated_at'
//     }
//   }
// );

// const connectMySQL = () => {
//   sequelize.authenticate()
//     .then(() => winston.info(`MySQL Database connected...`.yellow.bold))
//     .catch(err => winston.error(`ERROR: ${err}`));
// };

// module.exports = {
//   sequelize,
//   Sequelize,
//   connectMySQL
// };



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
    logging: false, // Set to console.log for debugging
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
    define: {
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

// Test database connection
const connectMySQL = () => {
  sequelize
    .authenticate()
    .then(() => winston.info(`MySQL Database connected...`.yellow.bold))
    .catch((err) => winston.error(`ERROR: ${err}`));
};

// Sync models with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true }); // Automatically creates or updates tables
    winston.info(`Database synced successfully...`.green.bold);
  } catch (err) {
    winston.error(`ERROR syncing database: ${err.message}`.red.bold);
  }
};

module.exports = {
  sequelize,
  Sequelize,
  connectMySQL,
  syncDatabase,
};
