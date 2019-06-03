const sess = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(sess)

const store = new MongoDBStore({
  uri: process.env.DB_URI,
  collection: "sessions"
})

const session = sess({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: store,
  cookie: { secure: process.env.NODE_ENV === "production" }
})

module.exports = { session }
