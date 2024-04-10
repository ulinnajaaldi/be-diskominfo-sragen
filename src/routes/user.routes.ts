import { Router } from 'express'
import { getMe, login, register } from '../controllers/user.controller'
import authToken from '../middlewares/authToken'

export const UserRouter: Router = Router()

UserRouter.post('/register', register)
UserRouter.post('/login', login)
UserRouter.get('/me', authToken, getMe)
