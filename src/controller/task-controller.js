const { MongoClient } = require('mongodb');
const debug = require('debug')('app:auth-controller');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'matrix';

function taskController() {
  function getTasks(req, resp) {
    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const response = await db.collection('tasks').find().toArray();
        resp.render('task-list', { title: 'ToDos', data: response });
      } catch (e) {
        debug(e.stack);
      }
      client.close();
    }());
  }

  function createTask(req, resp) {
    const tasks = [{
      name: 'Task1',
      description: 'This is dummy task 1',
      status: 'In Progress',
      createdOn: new Date(),
      priority: 1,
      completedOn: null
    }, {
      name: 'Task2',
      description: 'This is dummy task 2',
      status: 'In Progress',
      createdOn: new Date(),
      priority: 1,
      completedOn: null
    }];

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const response = await db.collection('tasks').insertMany(tasks);
        resp.json(response);
      } catch (e) {
        debug(e.stack);
      }
      client.close();
    }());
  }

  function goToHistory(req, resp) {
    resp.render('task-history', { title: 'Your history page' });
  }

  return {
    getTasks,
    createTask,
    goToHistory
  };
}

module.exports = taskController();
