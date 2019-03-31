const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const { MongoClient } = require('mongodb');
const SETTINGS = require('./env-vars');

const app = express();

// Connection URL
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true });

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const taskRouter = require('./src/router/taskRouter')();

app.use('/task', taskRouter);

app.get('/', (req, res) => {
  res.render('index', { title: 'What are you upto?' });
});

app.listen(SETTINGS.port, () => {
  debug(`listening on port ${chalk.green(SETTINGS.port)}`);
});
