const mongoose = require("mongoose")
const winston = require("winston")

module.exports = () => {
  mongoose.set("useNewUrlParser", true)
  mongoose.set("useFindAndModify", false)

  mongoose.connect(process.env.DB_URI).then(() => {
    winston.info("Connected to mongoDB")
  })
}
