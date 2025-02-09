import type { HttpContext } from '@adonisjs/core/http'
import { MeetingRoomService } from '#services/meeting_room_service'
import {
  createMeetingRoomValidator,
  updateMeetingRoomValidator,
} from '#validators/meeting_room_validator'
import { notNullIdValidator } from '#validators/core_validator'

export default class MeetingRoomsController {
  private meetingRoomService = new MeetingRoomService()

  async create({ auth, response, request }: HttpContext) {
    const user = await auth.authenticate()
    const validatedData = await createMeetingRoomValidator.validate(request.all())

    const data = await this.meetingRoomService.create({ user, data: validatedData })
    return response.send({ data })
  }

  async list({ response }: HttpContext) {
    const data = await this.meetingRoomService.list()

    return response.send({ data })
  }

  async getById({ params, response }: HttpContext) {
    const id = await notNullIdValidator.validate(params.id)
    const data = await this.meetingRoomService.getById(id)

    return response.send({ data })
  }

  async edit({ auth, request, response }: HttpContext) {
    const user = await auth.authenticate()
    const validatedData = await updateMeetingRoomValidator.validate(request.all())

    const data = await this.meetingRoomService.update({ user, data: validatedData })
    return response.send({ data })
  }

  async destroy({ auth, params, response }: HttpContext) {
    await auth.authenticate()
    const { id } = await notNullIdValidator.validate(params.id)

    await this.meetingRoomService.deleteMeetingRoom(id)

    return response.ok({})
  }
}
