const jwt = require("jsonwebtoken")
const { Query } = require("./dbcon")

const everyUser = (req, res, next) => {
    jwt.verify(req.headers.token, "thisismysecret", (err, payload) => {
        if (err) return res.status(403).json({ err: true, msg: err.message })
        req.user = payload
        next()
    })
}

const onlyAdmin = async (req, res, next) => {
    jwt.verify(req.headers.token, "thisismysecret", async (err, payload) => {
        if (err) return res.status(403).json({ err: true, msg: err.message })
        const admin = await Query("SELECT users.* FROM users WHERE access=1")
        if (payload.user_id != admin[0].user_id)
            return res.status(403).json({ err: true, msg: "you dont have access" })
        req.user = payload
        next()
    })
}

module.exports = { everyUser, onlyAdmin }