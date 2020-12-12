const router = require("express").Router()
const { Query } = require("../dbcon")
const { onlyAdmin, regularUser } = require("../verification")

router.get("/adminall", onlyAdmin, async(req, res) => {
    try {
        const vacations = await Query(`SELECT * FROM vacations`)
        res.json(vacations)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/userall", regularUser, async(req, res) => {
    const { user_id } = req.user
    try {
        const q_userFollows = `SELECT vacations.vacation_id,vacations.description,vacations.country,
        vacations.image,vacations.date_start,vacations.date_finish,vacations.price,vacations.followers
        FROM follows INNER JOIN vacations ON follows.vacation_id=vacations.vacation_id
        WHERE user_id = ${user_id}`
        const userFollows = await Query(q_userFollows)
        const userUnFollows =await Query(`SELECT * FROM vacations`)
        for (let i = 0; i < userFollows.length; i++) {
            userUnFollows.filter(v => v.vacation_id != userFollows[i].vacation_id)
        }
        const allVacByOrder = [...userFollows, userUnFollows]
        res.json(allVacByOrder)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})


module.exports = router