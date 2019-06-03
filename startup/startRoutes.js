const bodyParser = require("body-parser")
const cors = require("cors")
const handleError = require("../middleware/handleError")
const { session } = require("../config/sessionConfig")
const corsConfig = require("../config/corsConfig")

module.exports = app => {
  //Middleware
  app.use(cors(corsConfig)) // only for development
  app.use(bodyParser.json())
  app.use(session)
  //Routes
  app.use("/api/users", require("../routes/users"))
  app.use("/api/auth", require("../routes/auth"))
  //Error catching middleware
  app.use(handleError)
}
