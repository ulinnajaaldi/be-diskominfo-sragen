import jtw from 'jsonwebtoken'
import { JWT_SECRET } from '../constants/config'
import { NextFunction, Request, Response } from 'express'

const authToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'Unauthorized', data: {} })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decode = jtw.verify(token, JWT_SECRET!)
    req.body.user = decode
    next()
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized', data: {} })
  }
}

export default authToken
