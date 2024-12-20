const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://mongo:27017/todolist', { useNewUrlParser: true });

const Task = mongoose.model('Task', { task: String });

app.post('/add', async (req, res) => {
    const task = new Task({ task: req.body.task });
    await task.save();
    res.send('Task added');
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks.map(t => t.task));
});

app.listen(3000, () => console.log('Server running on port 3000'));
