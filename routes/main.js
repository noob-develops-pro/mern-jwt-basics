import express from 'express'
import { login, dashboard } from '../controllers/main.js'
import authMiddleware from '../middleware/auth.js'

const mainRouter = express.Router()

// Login Route
mainRouter.post('/login', login)

// Dashboard Route
mainRouter.get('/dashboard', authMiddleware, dashboard)

export default mainRouter
