import mongoose, { Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const GaleriVideoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

GaleriVideoSchema.plugin(mongoosePaginate)

GaleriVideoSchema.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

interface GaleriVideoDocument extends Document {
  title: string
  video: string
  thumbnail: string
  description: string
}

export const GaleriVideoModel = mongoose.model<GaleriVideoDocument, mongoose.PaginateModel<GaleriVideoDocument>>(
  'GaleriVideo',
  GaleriVideoSchema
)
