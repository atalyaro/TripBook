const express = require("express")
const app = express()
const cors = require("cors")
require("./dbcon")
const cookieParser = require("cookie-parser")

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/auth", require("./routes/auth"))
app.use("/vacations", require("./routes/vacations"))
app.use("/follows", require("./routes/follows"))

app.listen(1000, () => "server 1000")