const express = require('express');
const app = express();
const cors = require('cors');
const config = require('config');
const todosRouter = require('./api/routing/todos.router');
const mongoose = require('mongoose');
const log4js = require('log4js');
const logger = log4js.getLogger();

const { port: serverPort } = config.get('webServer');
const { protocol, host, port, name } = config.get('dataBase');
const dbURL = `${protocol}://${host}:${port}/${name}`;

logger.level = 'debug';

try {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  return logger.error(error.message);
}

app.use(express.json());
app.use(cors());

app.use('/api/todos', todosRouter);

app.listen(serverPort, () =>
  console.log(`Server started at port ${serverPort}`)
);
