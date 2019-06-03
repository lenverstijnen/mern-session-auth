const router = require("express").Router()
const bcrypt = require("bcrypt")
const _ = require("lodash")
const { User, validate } = require("../models/user")
const { auth } = require("../middleware/auth")

//Get current user
router.get("/currentuser", auth, (req, res) => {
  const user = req.session.user
  res.json(_.pick(user, ["_id", "name", "role", "email"]))
})

//Create User
router.post("/", async (req, res) => {
  const errors = validate(req.body)
  if (errors) return res.status(400).json(errors)

  const { name, email, password } = req.body

  let user = await User.findOne({ email })
  if (user) return res.status(400).send("Dit e-mailadres is al in gebruik")

  user = new User({
    name,
    email,
    password
  })

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(req.body.password, salt)

  user = await user.save()

  res.status(200).json(_.pick(user, ["_id", "name", "email"]))
})

//Update User
router.put("/:id", async (req, res) => {
  const errors = validate(req.body)
  if (errors) return res.status(400).json(errors)

  let { name, email, password, isAdmin } = req.body
  isAdmin = isAdmin === undefined ? false : isAdmin

  let user = {
    name,
    email,
    isAdmin,
    password
  }

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(password, salt)

  user = await User.findByIdAndUpdate(req.params.id, user)
  if (!user) return res.status(400).send("Deze gebruiker bestaat niet")

  res.send(_.pick(user, ["_id", "name", "email"]))
})

//Delete User
router.delete("/:id", async (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id })
  if (!user) return res.status(400).send("Deze gebruiker is al verwijderd!")

  res.send(_.pick(user, ["_id", "name", "email"]))
})

module.exports = router
