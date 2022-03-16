const Todo = {
    _db: [],
    all(where) {
        if(where) {
            const result = this._db.filter(todo => {
                try {
                    Object.keys(where).forEach(key => {
                        if(where[key] !== todo[key]) {
                            throw new Error('Not found')
                        }
                    })
                    return true
                }catch(error) {
                    return false
                }
            })
            return Promise.resolve(result)
        }
        return Promise.resolve(this._db)
    },
    allForUser(userId) {
        const result = this._db.filter(todo => todo.user.id == userId)
        return Promise.resolve(result)
    },
    save(todo) {
        this._db.push({
            ...todo,
            id: this._db.length + 1,
        })
        return Promise.resolve({
            ...todo,
            id: this._db.length + 1,
        })
    },
    deleteById(id) {
        this._db = this._db.filter(item => item.id != id)
        return Promise.resolve()
    },
    deleteAll() {
        this._db = []
        return Promise.resolve()
    },
    deleteForUser(userId) {
        this._db = this._db.filter(todo => todo.user.id !== userId)
        return Promise.resolve()
    },
    deleteMany(where) {
        this._db = this._db.filter(item => {
            try {
                Object.keys(where).forEach((key) => {
                    if(where[key] !== item[key]) {
                        throw new Error('Not matched')
                    }
                })
                return true
            }catch(error) {
                return false
            }
        })
        return Promise.resolve()
    }
}

module.exports = Todo