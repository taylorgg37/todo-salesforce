const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const User = require('./models/User');
const JWT = require('jsonwebtoken');
const authorized = require('./middlewares/auth')

const app = express();
app.use(express.json())
app.use(helmet());
app.use(compression());

const HOST = process.env.API_HOST || 'localhost';
const PORT = process.env.API_PORT || 3003;

app.get('/api/auth/profile', authorized, (req, res) => {
    delete req.user.password
    res.status(200).json(req.user)
})

app.post('/api/auth/login', async (req, res) => {
    const user = await User.getOne(req.body)
    if(user) {
        const token = JWT.sign(user, 'secret')
        res.status(200).json({ access_token: token })
    } else {
        res.status(404).json({ message: 'No user found' })
    }
})

app.post('/api/auth/signup', async (req, res) => {
    try {
        if(!(req.body.username && req.body.password)) {
            return res.status(502).json({ message: 'Username and password requiredd' })
        }
        const user = await User.getOne({ username: req.body.username })
        if(!user) {
            const user = await User.save(req.body)
            const token = JWT.sign(user, 'secret')
            res.status(200).json({ access_token: token })
        }
        return res.status(502).json('User already registered')
    }catch(error) {
        res.status(502).json({ message: error.message })
    }
})

app.listen(PORT, () =>
    console.log(
        `✅  API Server started: http://${HOST}:${PORT}/auth`
    )
);
