/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */

import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { GaleriVideoModel } from '../models/galeri-video.model'

export const createGaleriVideo = async (req: Request, res: Response) => {
  const { title, video, thumbnail, description } = req.body
  try {
    const galeriVideoValidation = await GaleriVideoModel.findOne({ title })

    if (galeriVideoValidation) {
      logger.error('Galeri Video already exists')
      return res.status(400).send('Galeri Video already exists')
    }

    const galeriVideo = await GaleriVideoModel.create({ title, video, thumbnail, description })

    logger.info('Galeri Video created success')
    res.status(201).send({
      message: 'Galeri Video created success',
      data: galeriVideo
    })
  } catch (error) {
    logger.error('Err: Galeri Video - create', error)
    res.status(400).send({
      message: 'Galeri Video created failed',
      data: {}
    })
  }
}

export const getGaleriVideo = async (req: Request, res: Response) => {
  const { page = 1, limit = 20, search = '' } = req.query

  try {
    const galeriVideo = await GaleriVideoModel.paginate(
      {
        // @ts-ignore
        title: { $regex: search, $options: 'i' }
      },
      { page: +page, limit: +limit, sort: { createdAt: -1 } }
    )

    const { docs: results, limit: limitPerPage, totalPages, prevPage, nextPage, page: currentPage } = galeriVideo

    logger.info('Get Galeri Video success')
    return res.status(200).send({
      message: 'Get Galeri Video success',
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
    logger.error('Err: Galeri Video - get', error)
    res.status(400).send({
      message: 'Galeri Video get failed',
      data: {}
    })
  }
}

export const getGaleriVideoById = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const galeriVideo = await GaleriVideoModel.findById(id)

    if (!galeriVideo) {
      logger.error('Galeri Video not found')
      return res.status(404).send('Galeri Video not found')
    }

    logger.info('Get Galeri Video by id success')
    return res.status(200).send({
      message: 'Get Galeri Video by id success',
      data: galeriVideo
    })
  } catch (error) {
    logger.error('Err: Galeri Video - get by id', error)
    res.status(400).send({
      message: 'Galeri Video get by id failed',
      data: {}
    })
  }
}

export const updateGaleriVideo = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, video, thumbnail, description } = req.body

  try {
    const galeriVideo = await GaleriVideoModel.findByIdAndUpdate(
      id,
      { title, video, thumbnail, description },
      { new: true }
    )

    if (!galeriVideo) {
      logger.error('Galeri Video not found')
      return res.status(404).send('Galeri Video not found')
    }

    logger.info('Update Galeri Video success')
    res.status(200).send({
      message: 'Update Galeri Video success',
      data: galeriVideo
    })
  } catch (error) {
    logger.error('Err: Galeri Video - update', error)
    res.status(400).send({
      message: 'Galeri Video update failed',
      data: {}
    })
  }
}

export const deleteGaleriVideo = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const galeriVideo = await GaleriVideoModel.findByIdAndDelete(id)

    if (!galeriVideo) {
      logger.error('Galeri Video not found')
      return res.status(404).send('Galeri Video not found')
    }

    logger.info('Delete Galeri Video success')
    res.status(200).send({
      message: 'Delete Galeri Video success'
    })
  } catch (error) {
    logger.error('Err: Galeri Video - delete', error)
    res.status(400).send({
      message: 'Galeri Video delete failed',
      data: {}
    })
  }
}
