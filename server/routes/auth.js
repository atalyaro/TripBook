const router = require("express").Router()
const { Query } = require("../dbcon")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { everyUser } = require("../verification")

router.post("/login", async (req, res) => {
    const { user_name, password } = req.body
    try {
        if (!user_name || !password) return res.status(400).json({ err: true, msg: "missing info" })
        const users = await Query("SELECT * FROM users")
        const user = users.find(u => u.user_name == user_name)
        if (!user) return res.status(401).json({ err: true, msg: "user not exist" })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(402).json({ err: true, msg: "password is wrong" })
        const access_token = jwt.sign({ ...user, password: "****" }, "thisismysecret", { expiresIn: "20m" })
        const refresh_token = jwt.sign({ id: user.user_id }, "thisismysecret2", { expiresIn: "100d" })
        res.json({ err: false, access_token, refresh_token })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/register", async (req, res) => {
    const { private_name, family_name, user_name, password } = req.body
    try {
        if (!private_name || !family_name || !user_name || !password)
            return res.status(400).json({ err: true, msg: "missing info" })
        const users = await Query("SELECT * FROM users")
        if (users.find(u => u.user_name == user_name))
            return res.status(401).json({ err: true, msg: "username is taken" })
        const hash = await bcrypt.hash(password, 10)
        Query(`INSERT INTO users(private_name, family_name, user_name, password)
        VALUES("${private_name}","${family_name}","${user_name}","${hash}")`)
        res.json({ err: false, msg: "user registered" })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/refresh", async (req, res) => {
    try {
        jwt.verify(req.headers.refresh, "thisismysecret2", async (err, payload) => {
            if (err) return res.status(402).json({ err: true, msg: "token refresh expires" })
            const users = await Query("SELECT * FROM users")
            const user = users.find(u => u.user_id == payload.id)
            if (!user) return res.status(401).json({ err: true, msg: "user isnt longer exist" })
            const access_token = jwt.sign({ ...user, password: "****" }, "thisismysecret", { expiresIn: "20m" })
            res.json({ err: false, access_token, user })
        })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/logout", async (req, res) => {
    try {
        const access_token = ""
        res.json({ err: false, access_token })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/checkinglogin", everyUser, (req, res) => {
    res.json(req.user)
})

module.exports = router