import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Country from '#models/country'
import MetroStation from '#models/metro_station'
import District from '#models/district'
import Location from '#models/location'

export default class City extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({ serializeAs: null })
  declare countryId: number

  @belongsTo(() => Country)
  declare country: BelongsTo<typeof Country>

  @hasMany(() => MetroStation)
  declare metroStations: HasMany<typeof MetroStation>

  @hasMany(() => District)
  declare districts: HasMany<typeof District>

  @hasMany(() => Location)
  declare locations: HasMany<typeof Location>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
