const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SETTINGS = require('./env-vars');

const app = express();

// Connection URL
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true });

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'matrix' }));

require('./src/config/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/popper.js/dist')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const taskRouter = require('./src/router/taskRouter')();

app.use('/task', taskRouter);

const authRouter = require('./src/router/authRouter')();

app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.redirect('/auth/signUp');
});

app.listen(SETTINGS.port, () => {
  debug(`listening on port ${chalk.green(SETTINGS.port)}`);
});
