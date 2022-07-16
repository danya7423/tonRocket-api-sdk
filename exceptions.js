class Err extends Error {
    constructor(message) {
        super()
        this.msg = message
    }
}

class NotImplementedError extends Error {
    constructor(message) {
        super()
        this.msg = message
    }
}

module.exports = { Err, NotImplementedError }