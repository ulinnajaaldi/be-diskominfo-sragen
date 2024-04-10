import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { logger } from '../utils/logger'
import { JWT_SECRET } from '../constants/config'
import { UserModel } from '../models/user.model'
import { createUserValidation } from '../validations/user.validation'

export const register = async (req: Request, res: Response) => {
  const { error, value } = createUserValidation(req.body)

  if (error) {
    logger.error('Validation error: ', error)
    return res.status(400).send({ message: 'Invalid input', data: {} })
  }

  try {
    const exitingUser = await UserModel.findOne({ username: value.username })
    if (exitingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    await UserModel.create(value)

    logger.info('Create user success')
    return res.status(201).send({
      message: 'Create user success',
      data: {}
    })
  } catch (error) {
    logger.error('Err: user - create ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const User = await UserModel.findOne({ username })
    if (!User) {
      logger.error('User not found')
      return res.status(400).send({ message: 'User not found', data: {} })
    }

    const isMatch = await bcrypt.compare(password, User.password)

    if (!isMatch) {
      logger.error('Invalid login')
      return res.status(400).send({ message: 'Invalid login', data: {} })
    }

    const token = jwt.sign({ id: User.id }, JWT_SECRET!, { expiresIn: '1d' })

    return res.status(200).send({
      message: 'Login success',
      data: {
        username: User.username,
        token
      }
    })
  } catch (error) {
    logger.error('Err: user - create ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const User = await UserModel.findById(req.body.user.id)

    if (!User) {
      return res.status(400).send({ message: 'User not found', data: {} })
    }

    return res.status(200).send({
      message: 'Get me success',
      data: {
        username: User.username
      }
    })
  } catch (error) {
    logger.error('Err: user - get me ', error)
    return res.status(500).send({ message: 'Internal server error', data: {} })
  }
}
