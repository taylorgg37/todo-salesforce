const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const Todo = require('./models/Todo');
const authorized = require('./middlewares/auth')

const app = express();
app.use(express.json())
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3002;

app.post('/api/todos', authorized, async (req, res) => {
    const todo = { ...req.body, user: req.user }
    const result = await Todo.save(todo)
    res.status(201).json(result)
})

app.get('/api/todos', authorized, async (req, res) => {
    const todos = await Todo.allForUser(req.user.id)
    res.status(200).json(todos)
})

app.delete('/api/todos/:id', authorized, async (req, res) => {
    await Todo.deleteById(req.params.id)
    res.sendStatus(200)
})

app.delete('/api/todos', authorized, async (req, res) => {
    await Todo.deleteForUser(req.user.id)
    res.sendStatus(200)
})

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/todos`
    )
);
