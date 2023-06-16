import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const login = async (req, res) => {
  const { username, password } = req.body

  const id = new Date().getDate()

  if (!username || !password) {
    throw new CustomAPIError('Please Provide email and password', 400)
  }

  //creating a jwt token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    success: true,
    message: `hello ${req.user.username}, welcome : ${luckyNumber}`,
  })
}

export { login, dashboard }
