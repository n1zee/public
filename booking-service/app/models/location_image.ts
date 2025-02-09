import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Location from '#models/location'

export default class LocationImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare image: string

  @column({ serializeAs: null })
  declare locationId: number

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
