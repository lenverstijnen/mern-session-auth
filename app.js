require("dotenv").config()
const express = require("express")
const app = express()
const winston = require("winston")
const startDbConnection = require("./startup/startDbConnection")
const startRoutes = require("./startup/startRoutes")
const startLogger = require("./startup/startLogger")
const checkConfig = require("./startup/checkConfig")

//Start up
startLogger()
checkConfig()
startDbConnection()
startRoutes(app)

//TODO: CatchAll Route for serving front-end

//Start server
app.listen(process.env.PORT, () =>
  winston.info(`App listens on port ${process.env.PORT}`)
)
