import { Router } from 'express'
import authToken from '../middlewares/authToken'
import { count } from '../controllers/count.controller'

export const CountRouter: Router = Router()

CountRouter.get('/', authToken, count)
