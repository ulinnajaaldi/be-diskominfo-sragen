import axios from 'axios'
import { IMGBB_API_KEY } from '../constants/config'

const storeImage = async (imageFile: any) => {
  const url = 'https://api.imgbb.com/1/upload'
  const formData = new FormData()

  formData.append('image', imageFile.buffer.toString('base64'))
  formData.append('key', IMGBB_API_KEY ?? '')

  const response = await axios.post(url, formData)
  return response.data.data.url
}

export { storeImage }
