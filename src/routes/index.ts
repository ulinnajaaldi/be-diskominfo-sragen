import { Application, Router } from 'express'
import { HealthRouter } from './health.routes'
import { UserRouter } from './user.routes'
import { BeritaRouter } from './berita.routes'
import { GaleriImageRouter } from './galeri-image.routes'
import { GaleriVideoRouter } from './galeri-video.routes'

const _routes: Array<[string, Router]> = [
  ['/v1/api/', HealthRouter],
  ['/v1/api/auth', UserRouter],
  ['/v1/api/berita', BeritaRouter],
  ['/v1/api/galeri-image', GaleriImageRouter],
  ['/v1/api/galeri-video', GaleriVideoRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
