import jwt from 'jsonwebtoken'
import CustomAPIError from '../errors/custom-error.js'

const secretKey = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  // Check if token exists
  if (!token) {
    throw new CustomAPIError('Unauthorized.. ', 401)
  }

  try {
    const decoded = jwt.verify(token, secretKey)
    console.log(decoded, 'deco')

    req.user = decoded

    next()
  } catch (error) {
    throw new CustomAPIError('Invalid token', 401)
  }
}

export default authMiddleware
