import express from 'express'
import { login, dashboard } from '../controllers/main.js'

const mainRouter = express.Router()

// Login Route
mainRouter.post('/login', login)

// Dashboard Route
mainRouter.get('/dashboard', dashboard)

export default mainRouter
