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
  //creating a jwt token
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  // sending the token to frontend so next time this token can be included in any future request.
  res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
  // getting the token we provided erliear to frontend
  const authHeader = req.headers.authorization
  console.log(authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('token not provided', 401)
  }
  const token = authHeader.split(' ')[1]

  try {
    //varifying the tokend with the string we have to check if this is the right token.
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
      success: true,
      message: `hello ${decoded.username}, welcome : ${luckyNumber}`,
    })
  } catch (error) {
    throw new CustomAPIError('not authorized to access the resource', 401)
  }
}

export { login, dashboard }
