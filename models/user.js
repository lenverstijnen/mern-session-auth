const mongoose = require("mongoose")
const { validate, Test } = require("validator-dutch")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const User = mongoose.model("User", userSchema)

const validateUser = user => {
  const tests = {
    name: Test().fullName(),
    email: Test().email(),
    isAdmin: Test()
      .array()
      .optional(),
    password: Test().minLength(8),
    password2: Test().shouldEqual(
      "password",
      "De wachtwoorden komen niet overeen"
    )
  }
  return validate(user, tests)
}

exports.User = User
exports.validate = validateUser
