const app = require('./app');
const config = require('./config/config');
const mongoose = require('mongoose');

let server;
mongoose.connect(config.db.databaseUrl, config.db.options).then(() => {
  console.log('Connected to MongoDB');
  server = app.listen(config.port, config.host, () => {
    console.log(`App listening on port ${config.port}`)
  })
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed')
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error)
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.log('SIGTERM received')
  if (server) {
    server.close();
  }
});
