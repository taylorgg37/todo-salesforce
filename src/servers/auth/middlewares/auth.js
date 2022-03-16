const JWT = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const header = req.headers.authorization
    const token = header && header.split(" ")[1]
    if(token) {
        const user = JWT.decode(token)
        req.user = user
        next()
    } else {
        res.sendStatus(403)
    }
}