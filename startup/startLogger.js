const winston = require("winston")
require("winston-mongodb")
require("express-async-errors")

module.exports = () => {
  //Catch Uncaught Exeptions
  winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtExeptions.log" }),
    new winston.transports.Console()
  )
  process.on("unhandledRejection", err => {
    throw err
  })

  //Set Logger
  winston.add(winston.transports.File, { filename: "logfile.log" })
  winston.add(winston.transports.MongoDB, {
    db: process.env.DB_URI,
    collection: "errors"
  })
}
