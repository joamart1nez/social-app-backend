const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');

const dataUser = require('../controller/dataUser/dataUser');

router.get('/', dataUser.getDataUser);
router.get('/get-all-data-users/:id', dataUser.getAllDataUsers);
router.post('/update-data-user/:id', dataUser.updateDataUser);
router.post('/upload/:id',  dataUser.fileUpload);
router.post('/follow/:id')

const taskController = require('../controller/userTasks/taskRoutes');

router.get('/task/:id', taskController.getTasks);
router.post('/task', taskController.addTask);
router.put('/task/:id', taskController.editTaks);
router.delete('/task/:id', taskController.deleteTask);

module.exports = router