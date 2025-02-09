import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MeetingRoomPricePeriod extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare meetingRoomId: number

  @column()
  declare startMinutes: number

  @column()
  declare endMinutes: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
