import { Request, Response } from 'express'
import { logger } from '../utils/logger'
import { BeritaModel } from '../models/berita.model'
import { GaleriImageModel } from '../models/galeri-image.model'
import { GaleriVideoModel } from '../models/galeri-video.model'

export const count = async (req: Request, res: Response) => {
  try {
    const berita = await BeritaModel.countDocuments()
    const galeriImage = await GaleriImageModel.countDocuments()
    const galeriVideo = await GaleriVideoModel.countDocuments()

    logger.info('Get count success')
    return res.status(200).send({
      message: 'Get count success',
      data: {
        berita,
        galeriImage,
        galeriVideo
      }
    })
  } catch (error) {
    logger.error('Err: count - get', error)
    res.status(400).send({
      message: 'Get count failed',
      data: {}
    })
  }
}
