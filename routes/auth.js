const express = require("express")
const router = express.Router()
const { User } = require("../models/user")
const { validate, Test } = require("validator-dutch")
const bcrypt = require("bcrypt")
const _ = require("lodash")
const { auth } = require("../middleware/auth")

router.post("/login", async (req, res) => {
  const errors = validateLogin(req.body)
  if (errors) return res.status(400).send(errors)

  let user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Verkeerd e-mailadres of wachtwoord")
  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword)
    return res.status(400).send("Verkeerd e-mailadres of wachtwoord")

  user = _.pick(user, ["_id", "name", "role", "email"])
  req.session.user = user
  res.send(user)
})

router.get("/logout", (req, res) => {
  req.session.destroy()
  res.end("done")
})

const validateLogin = input => {
  const tests = {
    email: Test()
      .email()
      .required(),
    password: Test().required()
  }
  return validate(input, tests)
}
module.exports = router
