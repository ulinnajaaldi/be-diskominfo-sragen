import mongoose, { Document } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const BeritaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

BeritaSchema.plugin(mongoosePaginate)

BeritaSchema.method('toJSON', function (this: Document) {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

interface InstitutionDocument extends Document {
  title: string
  image: string
  content: string
}

export const BeritaModel = mongoose.model<InstitutionDocument, mongoose.PaginateModel<InstitutionDocument>>(
  'Berita',
  BeritaSchema
)
