import type { HttpContext } from '@adonisjs/core/http'

import { GeoService } from '#services/geo_service'
import { crateCountryValidator, updateCountryValidator } from '#validators/geo_validator'
import { notNullIdValidator } from '#validators/core_validator'

export default class CountriesController {
  private geoService = new GeoService()

  async create({ auth, request, response }: HttpContext) {
    await auth.authenticate()
    const validatedData = await crateCountryValidator.validate(request.all())

    const data = await this.geoService.createCountry(validatedData)
    return response.send({ data })
  }

  async list({ response }: HttpContext) {
    const data = await this.geoService.getCountries()

    return response.send({ data })
  }

  async getById({ params, response }: HttpContext) {
    const id = await notNullIdValidator.validate(params.id)
    const data = await this.geoService.getCountry(id)

    return response.send({ data })
  }

  async edit({ auth, request, response }: HttpContext) {
    await auth.authenticate()
    const validatedData = await updateCountryValidator.validate(request.all())

    const data = await this.geoService.editCountry(validatedData)
    return response.send({ data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    await auth.authenticate()
    const id = await notNullIdValidator.validate(params.id)

    await this.geoService.deleteCountry(id)
    return response.ok({})
  }
}
