import { Router } from 'express'
import authToken from '../middlewares/authToken'
import { createBerita, deleteBerita, getBerita, getBeritaById, updateBerita } from '../controllers/berita.controller'

export const BeritaRouter: Router = Router()

BeritaRouter.post('/', authToken, createBerita)
BeritaRouter.get('/', getBerita)
BeritaRouter.get('/:id', getBeritaById)
BeritaRouter.put('/:id', authToken, updateBerita)
BeritaRouter.patch('/:id', authToken, updateBerita)
BeritaRouter.delete('/:id', authToken, deleteBerita)
