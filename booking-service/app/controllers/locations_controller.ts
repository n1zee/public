import type { HttpContext } from '@adonisjs/core/http'

import { LocationService } from '#services/location_service'
import { crateLocationValidator, updateLocationValidator } from '#validators/location_validator'
import { notNullIdValidator } from '#validators/core_validator'

export default class LocationsController {
  private locationService = new LocationService()

  async create({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()

    const locationData = await crateLocationValidator.validate(request.all())

    const res = await this.locationService.createLocation({
      user,
      locationData,
    })

    return response.send({ data: res })
  }

  async list({ response }: HttpContext) {
    const data = await this.locationService.getLocations()
    return response.send({ data })
  }

  async getById({ params, response }: HttpContext) {
    const data = await this.locationService.getLocation(params.id)
    return response.send({ data })
  }

  async edit({ request, response, auth }: HttpContext) {
    const user = await auth.authenticate()

    const locationData = await updateLocationValidator.validate(request.all())

    const data = await this.locationService.editLocation({
      user,
      locationData,
    })

    return response.send({ data })
  }

  async destroy({ request, auth }: HttpContext) {
    await auth.authenticate()

    const id = await notNullIdValidator.validate(request.param('id'))

    await this.locationService.deleteLocation(id)
  }
}
