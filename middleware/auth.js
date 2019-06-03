const auth = (req, res, next) => {
  const user = req.session.user
  if (!user) return res.status(401).send("User not defined")
  else next()
}

const admin = (req, res, next) => {
  if (req.session.user.isAdmin) return next()
  res.sendStatus(403)
}

module.exports = { auth, admin }
