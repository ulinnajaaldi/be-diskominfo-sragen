import Joi from 'joi'
import type { UserInterface } from '../types/validations'

export const createUserValidation = (payload: UserInterface) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  })

  return schema.validate(payload)
}
