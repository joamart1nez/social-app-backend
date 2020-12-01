const User = require('../../models/User');
const Task = require('../../models/Task');
const ObjectId = require('mongodb').ObjectID;

exports.getTasks = async (req, res)=>{
    const id = req.params.id;
    const tasks = await Task.find({user: id});
    res.json({
       tasks: tasks
    });
}

exports.editTaks = async (req, res)=>{
    const id = req.params.id;
    const body = req.body;
    await Task.updateOne({_id: id}, body);
    res.json({
        status: 'Task edited successfully!',
        color: 'alert-success'
    });
}

exports.addTask = async (req,res)=>{
    const body = req.body;
    body.status = false;
    const task = new Task(body);
    await task.save();
    res.json({
        status: 'Task saved successfully!',
        color: 'alert-success'
    });
}

exports.deleteTask = async (req,res)=>{
    let id = req.params.id;
    await Task.deleteOne({_id: id});
    res.json({
        status: 'Task deleted succesfully!',
        color: 'alert-danger'
    });
    id = '';
}