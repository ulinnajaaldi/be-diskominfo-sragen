import { Router } from 'express'
import authToken from '../middlewares/authToken'
import {
  createGaleriImage,
  deleteGaleriImage,
  getGaleriImage,
  getGaleriImageById,
  updateGaleriImage
} from '../controllers/galeri-image.controller'

export const GaleriImageRouter: Router = Router()

GaleriImageRouter.post('/', authToken, createGaleriImage)
GaleriImageRouter.get('/', getGaleriImage)
GaleriImageRouter.get('/:id', getGaleriImageById)
GaleriImageRouter.put('/:id', authToken, updateGaleriImage)
GaleriImageRouter.patch('/:id', authToken, updateGaleriImage)
GaleriImageRouter.delete('/:id', authToken, deleteGaleriImage)
