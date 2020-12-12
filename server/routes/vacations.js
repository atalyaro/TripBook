const router = require("express").Router()
const { Query } = require("../dbcon")
const { onlyAdmin, regularUser } = require("../verification")

router.get("/adminall", onlyAdmin, async (req, res) => {
    try {
        const vacations = await Query(`SELECT * FROM vacations`)
        res.json(vacations)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/userall", regularUser, async (req, res) => {
    const { user_id } = req.user
    try {
        const q_userFollows = `SELECT vacations.*
        FROM follows INNER JOIN vacations ON follows.vacation_id=vacations.vacation_id
        WHERE user_id = ${user_id}`
        const userFollows = await Query(q_userFollows)
        const userUnFollows = await Query(`SELECT * FROM vacations`)
        for (let i = 0; i < userFollows.length; i++) {
            for (let j = 0; j < userUnFollows.length; j++) {
                if (userFollows[i].vacation_id==userUnFollows[j].vacation_id){
                    userUnFollows.splice(j,1)
                }
            }
        }
        const allVacByOrder = [...userFollows, userUnFollows]
        res.json(allVacByOrder)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/add", onlyAdmin, async (req, res) => {
    const { description, country, image, date_start, date_finish, price } = req.body
    try {
        const q_addVac = `INSERT INTO vacations(description, country, image, date_start, date_finish, price)
        VALUES('${description}','${country}','${image}','${date_start}','${date_finish}',${price})`
        await Query(q_addVac)
        const vacations = await Query(`SELECT * FROM vacations`)
        res.json(vacations)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.put("/edit", onlyAdmin, async (req, res) => {
    const { vacation_id, description, country, image, date_start, date_finish, price } = req.body
    try {
        const q_updateVAC = `UPDATE vacations
        SET description="${description}", country="${country}", image="${image}",
        date_start="${date_start}", date_finish="${date_finish}", price=${price}
        WHERE vacation_id= ${vacation_id}`
        await Query(q_updateVAC)
        const vacations = await Query(`SELECT * FROM vacations`)
        res.json(vacations)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.delete("/delete", onlyAdmin, async (req, res) => {
    const { vacation_id } = req.body
    try {
        await Query(`DELETE FROM vacations
        WHERE vacation_id= ${vacation_id}`)
        const vacations = await Query(`SELECT * FROM vacations`)
        res.json(vacations)
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router