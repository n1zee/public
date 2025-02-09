import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import MeetingRoom from '#models/meeting_room'

export default class MeetingRoomImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare image: string

  @column()
  declare meetingRoomId: number

  @belongsTo(() => MeetingRoom)
  declare meetingRoom: BelongsTo<typeof MeetingRoom>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
