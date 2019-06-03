module.exports = () => {
  if (!process.env.SESSION_SECRET) {
    throw new Error("FATAL ERROR: process.env.SESSION_SECRET is not set!")
  }
}
