/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { BeritaModel } from '../models/berita.model'

export const createBerita = async (req: Request, res: Response) => {
  const { title, image, content } = req.body
  try {
    const beritaValidation = await BeritaModel.findOne({ title })

    if (beritaValidation) {
      logger.error('Berita already exists')
      return res.status(400).send('Berita already exists')
    }

    const berita = await BeritaModel.create({ title, image, content })

    logger.info('Berita created success')
    res.status(201).send({
      message: 'Berita created success',
      data: berita
    })
  } catch (error) {
    logger.error('Err: Berita - create', error)
    res.status(400).send({
      message: 'Berita created failed',
      data: {}
    })
  }
}

export const getBerita = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, search = '' } = req.query

  try {
    const berita = await BeritaModel.paginate(
      {
        // @ts-ignore
        title: { $regex: search, $options: 'i' }
      },
      { page: +page, limit: +limit, sort: { createdAt: -1 } }
    )

    const { docs: results, limit: limitPerPage, totalPages, prevPage, nextPage, page: currentPage } = berita

    logger.info('Get Berita success')
    return res.status(200).send({
      message: 'Get Berita success',
      data: {
        currentPage,
        limitPerPage,
        totalPages,
        prevPage,
        nextPage,
        results
      }
    })
  } catch (error) {
    logger.error('Err: Berita - get', error)
    res.status(400).send({
      message: 'Berita get failed',
      data: {}
    })
  }
}

export const getBeritaById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const berita = await BeritaModel.findById(id)

    if (!berita) {
      logger.error('Berita not found')
      return res.status(404).send('Berita not found')
    }

    logger.info('Get Berita by id success')
    res.status(200).send({
      message: 'Get Berita by id success',
      data: berita
    })
  } catch (error) {
    logger.error('Err: Berita - get by id', error)
    res.status(400).send({
      message: 'Berita get by id failed',
      data: {}
    })
  }
}

export const updateBerita = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, image, content } = req.body

  try {
    const berita = await BeritaModel.findByIdAndUpdate(id, { title, image, content }, { new: true })

    if (!berita) {
      logger.error('Berita not found')
      return res.status(404).send('Berita not found')
    }

    logger.info('Berita updated success')
    res.status(200).send({
      message: 'Berita updated success',
      data: berita
    })
  } catch (error) {
    logger.error('Err: Berita - update', error)
    res.status(400).send({
      message: 'Berita updated failed',
      data: {}
    })
  }
}

export const deleteBerita = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const berita = await BeritaModel.findByIdAndDelete(id)

    if (!berita) {
      logger.error('Berita not found')
      return res.status(404).send('Berita not found')
    }

    logger.info('Berita deleted success')
    res.status(200).send({
      message: 'Berita deleted success'
    })
  } catch (error) {
    logger.error('Err: Berita - delete', error)
    res.status(400).send({
      message: 'Berita deleted failed',
      data: {}
    })
  }
}
