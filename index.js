// const app = require('./app');
// require('colors');
// const config = require('./config/config');
// const { connectMySQL } = require('./config/db');

// // Connect to database
// connectMySQL();

// // Listening on port
// const PORT = config.PORT || 5000;
// const server = app.listen(
//   PORT,
//   console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.cyan.bold)
// );

// // Close server & exit process
// const exitHandler = () => {
//   if (server) {
//     server.close(() => {
//       console.log('Server closed');
//       process.exit(0);
//     });
//   } else {
//     process.exit(0);
//   }
// };

// const unexpectedErrorHandler = (err) => {
//   console.log(`Error: ${err.message}`.red);
//   exitHandler();
// };

// // Handle unhandled promise rejections
// process.on('uncaughtException', unexpectedErrorHandler);
// process.on('unhandledRejection', unexpectedErrorHandler);

// process.on('SIGTERM', () => {
//   console.log(`SIGTERM received`.red);

//   if (server) {
//     server.close();
//   }
// });



const app = require('./app');
require('colors');
const config = require('./config/config');
const { connectMySQL, syncDatabase } = require('./config/db');

// Connect to database and sync models
(async () => {
  try {
    connectMySQL();
    await syncDatabase(); // Sync models with the database
  } catch (err) {
    console.error(`Database connection or sync failed: ${err.message}`.red);
    process.exit(1); // Exit the process if database connection fails
  }
})();

// Start the server
const PORT = config.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${config.NODE_ENV} mode on port ${PORT}`.cyan.bold)
);

// Graceful shutdown
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed'.yellow.bold);
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Handle uncaught exceptions and promise rejections
const unexpectedErrorHandler = (err) => {
  console.error(`Unexpected error: ${err.message}`.red);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

// Handle SIGTERM (e.g., from Docker or PM2)
process.on('SIGTERM', () => {
  console.log('SIGTERM received'.yellow);
  if (server) {
    server.close();
  }
});
