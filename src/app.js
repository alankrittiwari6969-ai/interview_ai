const express = require("express")
const CookieParser   = require("cookie-parser")
const app = express()

app.use(express.json())

const authRouter = require("./route/auth.route")
app.use("/api/auth",authRouter)





module.exports = app