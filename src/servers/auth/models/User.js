const User = {
    _db: [
        { id: 1, username: 'admin', password: 'admin' },
        { id: 2, username: 'john_wick', password: '1234' }
    ],
    getOne(where) {
        const user = this._db.find(item => {
            try {
                Object.keys(where).forEach((key) => {
                    if(where[key] !== item[key]) {
                        throw new Error('Not found')
                    }
                })
                return true
            }catch(error) {
                return false
            }
        })
        return Promise.resolve(user)
    },
    save(user) {
        if(user.username && user.password) {
            const newuser = {
                id: this._db.length + 1,
                username: user.username,
                password: user.password
            }
            this._db.push(newuser)
            return Promise.resolve(newuser)
        }
        throw new Error('Username and password required')
    }
}

module.exports = User