import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET

const authMiddleware = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1]
  console.log(token)

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized auth' })
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, secretKey)

    // Attach the decoded payload to the request object
    req.user = decoded

    // Move to the next middleware
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

export default authMiddleware
