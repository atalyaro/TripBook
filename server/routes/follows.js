const router = require("express").Router()
const { Query } = require("../dbcon")
const { everyUser } = require("../verification")

router.post("/addfollow", everyUser, async (req, res) => {
    const { user_id } = req.user
    const { vacation_id } = req.body
    try {
        await Query(`INSERT INTO follows (user_id,vacation_id)
        VALUES(${user_id},${vacation_id})`)
        await Query(`UPDATE vacations
        SET followers= followers+1
        WHERE vacation_id= ${vacation_id}`)
        res.json({ err: false })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.delete("/deletefollow", everyUser, async (req, res) => {
    const { user_id } = req.user
    const { vacation_id } = req.body
    try {
        await Query(`DELETE FROM follows
        WHERE vacation_id=${vacation_id} AND user_id=${user_id}`)
        await Query(`UPDATE vacations
        SET followers= followers-1
        WHERE vacation_id= ${vacation_id}`)
        res.json({ err: false })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/checkingfollow", everyUser, async (req, res) => {
    const { user_id } = req.user
    const { vacation_id } = req.body
    try {
        const follow = await Query(`SELECT * FROM follows
        WHERE vacation_id=${vacation_id} AND user_id=${user_id}`)
        if (follow.length) {
            res.json({ err: false, follow: false })
        } else {
            res.json({ err: false, follow: true })
        }
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/howmanyfollows", everyUser, async (req, res) => {
    const { user_id } = req.user
    try {
        const follows = await Query(`SELECT COUNT(user_id) From follows
        WHERE user_id=${user_id}`)
        res.json({ err: false, follows })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})
module.exports = router