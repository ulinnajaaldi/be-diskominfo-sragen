/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { GaleriImageModel } from '../models/galeri-image.model'

export const createGaleriImage = async (req: Request, res: Response) => {
  const { title, image } = req.body
  try {
    const galeriImageValidation = await GaleriImageModel.findOne({ title })

    if (galeriImageValidation) {
      logger.error('Galeri Image already exists')
      return res.status(400).send('Galeri Image already exists')
    }

    const galeriImage = await GaleriImageModel.create({ title, image })

    logger.info('Galeri Image created success')
    res.status(201).send({
      message: 'Galeri Image created success',
      data: galeriImage
    })
  } catch (error) {
    logger.error('Err: Galeri Image - create', error)
    res.status(400).send({
      message: 'Galeri Image created failed',
      data: {}
    })
  }
}

export const getGaleriImage = async (req: Request, res: Response) => {
  const { page = 1, limit = 20, search = '' } = req.query

  try {
    const galeriImage = await GaleriImageModel.paginate(
      {
        // @ts-ignore
        title: { $regex: search, $options: 'i' }
      },
      { page: +page, limit: +limit, sort: { createdAt: -1 } }
    )

    const { docs: results, limit: limitPerPage, totalPages, prevPage, nextPage, page: currentPage } = galeriImage

    logger.info('Get Galeri Image success')
    return res.status(200).send({
      message: 'Get Galeri Image success',
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
    logger.error('Err: Galeri Image - get', error)
    res.status(400).send({
      message: 'Galeri Image get failed',
      data: {}
    })
  }
}

export const getGaleriImageById = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const galeriImage = await GaleriImageModel.findById(id)

    if (!galeriImage) {
      logger.error('Galeri Image not found')
      return res.status(404).send('Galeri Image not found')
    }

    logger.info('Get Galeri Image by id success')
    res.status(200).send({
      message: 'Get Galeri Image by id success',
      data: galeriImage
    })
  } catch (error) {
    logger.error('Err: Galeri Image - get by id', error)
    res.status(400).send({
      message: 'Galeri Image get by id failed',
      data: {}
    })
  }
}

export const updateGaleriImage = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, image } = req.body

  try {
    const galeriImage = await GaleriImageModel.findByIdAndUpdate(id, { title, image }, { new: true })

    if (!galeriImage) {
      logger.error('Galeri Image not found')
      return res.status(404).send('Galeri Image not found')
    }

    logger.info('Update Galeri Image success')
    res.status(200).send({
      message: 'Update Galeri Image success',
      data: galeriImage
    })
  } catch (error) {
    logger.error('Err: Galeri Image - update', error)
    res.status(400).send({
      message: 'Galeri Image update failed',
      data: {}
    })
  }
}

export const deleteGaleriImage = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const galeriImage = await GaleriImageModel.findByIdAndDelete(id)

    if (!galeriImage) {
      logger.error('Galeri Image not found')
      return res.status(404).send('Galeri Image not found')
    }

    logger.info('Delete Galeri Image success')
    res.status(200).send({
      message: 'Delete Galeri Image success'
    })
  } catch (error) {
    logger.error('Err: Galeri Image - delete', error)
    res.status(400).send({
      message: 'Galeri Image delete failed',
      data: {}
    })
  }
}
