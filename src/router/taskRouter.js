const express = require('express');
const taskController = require('../controller/task-controller');

const taskRouter = express.Router();


function router() {
  taskRouter.route('/').get((req, resp) => {
    taskController.getTasks(req, resp);
  });

  taskRouter.route('/add').get((req, resp) => {
    taskController.createTask(req, resp);
  });

  taskRouter.route('/history').get((req, resp) => {
    taskController.goToHistory(req, resp);
  });

  return taskRouter;
}

module.exports = router;
