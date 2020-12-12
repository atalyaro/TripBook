const router = require("express").Router()
const { Query } = require("../dbcon")
const { regularUser } = require("../verification")

router.post("/addfollow", regularUser, async (req, res) => {
    const { user_id } = req.user
    const { vacation_id } = req.body
    try {
        await Query(`INSERT INTO follows (user_id,vacation_id)
        VALUES(${user_id},${vacation_id})`)
        await Query(`UPDATE vacations
        SET followers= followers+1
        WHERE vacation_id= ${vacation_id}`)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.delete("/deletefollow", regularUser, async (req, res) => {
    const { user_id } = req.user
    const { vacation_id } = req.body
    try {
        await Query(`DELETE FROM follows
        WHERE vacation_id=${vacation_id} AND user_id=${user_id}`)
        await Query(`UPDATE vacations
        SET followers= followers-1
        WHERE vacation_id= ${vacation_id}`)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router