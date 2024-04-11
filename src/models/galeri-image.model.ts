import mongoose, { Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const GaleriImageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

GaleriImageSchema.plugin(mongoosePaginate)

GaleriImageSchema.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

interface GaleriImageDocument extends Document {
  title: string
  image: string
}

export const GaleriImageModel = mongoose.model<GaleriImageDocument, mongoose.PaginateModel<GaleriImageDocument>>(
  'GaleriImage',
  GaleriImageSchema
)
