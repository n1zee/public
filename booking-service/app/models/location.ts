import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'

import City from '#models/city'
import District from '#models/district'
import MetroStation from '#models/metro_station'
import LocationImage from '#models/location_image'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare name: string

  @column()
  declare shortName: string

  @column()
  declare address: string

  @column({ serializeAs: null })
  declare cityId: number

  @column()
  declare pathDescription: string

  @column()
  declare pathImage: string

  @column()
  declare pathVideo: string

  @column()
  declare coordinates: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @column()
  declare website: string

  @column()
  declare socialLinks: string

  @column()
  declare openingHours: string

  @column()
  declare description: string

  @column({ serializeAs: null })
  declare districtId?: number | null

  @belongsTo(() => City)
  declare city: BelongsTo<typeof City>

  @belongsTo(() => District)
  declare district: BelongsTo<typeof District>

  @hasMany(() => LocationImage)
  declare images: HasMany<typeof LocationImage>

  @manyToMany(() => MetroStation, {
    pivotTable: 'locations_metro_stations',
    localKey: 'id',
    pivotForeignKey: 'location_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'metro_station_id',
  })
  declare metroStations: ManyToMany<typeof MetroStation>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
