import { Router } from 'express'
import authToken from '../middlewares/authToken'
import {
  createGaleriVideo,
  deleteGaleriVideo,
  getGaleriVideo,
  getGaleriVideoById,
  updateGaleriVideo
} from '../controllers/galeri-video.controller'

export const GaleriVideoRouter: Router = Router()

GaleriVideoRouter.post('/', authToken, createGaleriVideo)
GaleriVideoRouter.get('/', getGaleriVideo)
GaleriVideoRouter.get('/:id', getGaleriVideoById)
GaleriVideoRouter.put('/:id', authToken, updateGaleriVideo)
GaleriVideoRouter.patch('/:id', authToken, updateGaleriVideo)
GaleriVideoRouter.delete('/:id', authToken, deleteGaleriVideo)
