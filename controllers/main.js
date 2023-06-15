import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import CustomAPIError from '../errors/custom-error.js'

dotenv.config()

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    throw new CustomAPIError('Please Provide email and password', 400)
  }

  const id = new Date().getDate()

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization
  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('token not provided', 401)
  }
  const luckyNumber = Math.floor(Math.random() * 100)
  res.status(200).json({
    success: true,
    message: `hello here is your secret Number: ${luckyNumber}`,
  })
}

export { login, dashboard }
