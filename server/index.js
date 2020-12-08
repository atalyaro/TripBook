const express= require("express")
const app= express()
const cors= require("cors")
require ("./dbcon")

app.use(cors())
app.use(express.json())
app.use("/vacations",require("./routes/vacations"))

app.listen(1000,()=>"server 1000")