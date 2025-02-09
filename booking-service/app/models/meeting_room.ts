import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'

import Location from '#models/location'
import Equipment from '#models/equipment'
import MeetingRoomImage from '#models/meeting_room_image'
import MeetingRoomPrice from '#models/meeting_room_price'
import MeetingRoomPricePeriod from '#models/meeting_room_price_period'

export default class MeetingRoom extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare shortName: string | null

  @column()
  declare capacity: number

  @column()
  declare minRentalPeriod: number

  @column()
  declare costPerHolidaysDiscount: number | null

  @column()
  declare endOfBookingGap: number

  @column()
  declare isAvailable: boolean

  @column()
  declare locationId: number

  @belongsTo(() => Location)
  declare location: BelongsTo<typeof Location>

  @manyToMany(() => Equipment, {
    pivotTable: 'meeting_room_equipments',
    localKey: 'id',
    pivotForeignKey: 'meeting_room_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'equipment_id',
  })
  declare equipments: ManyToMany<typeof Equipment>

  @hasOne(() => MeetingRoomPrice)
  declare basePrice: HasOne<typeof MeetingRoomPrice>

  @hasMany(() => MeetingRoomPricePeriod)
  declare periodsPrices: HasMany<typeof MeetingRoomPricePeriod>

  @hasMany(() => MeetingRoomImage)
  declare images: HasMany<typeof MeetingRoomImage>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
