import { Infer } from '@vinejs/vine/types'

import User from '#models/user'

import MeetingRoomModel from '#models/meeting_room'

import MeetingRoomImage from '#models/meeting_room_image'
import MeetingRoomPricePeriod from '#models/meeting_room_price_period'
import { meetingRoomSchema, updateMeetingRoomSchema } from '#validators/meeting_room_validator'
import MeetingRoomPrice from '#models/meeting_room_price'

type CreateParams = {
  user: User
  data: Infer<typeof meetingRoomSchema>
}

type UpdateParams = {
  user: User
  data: Infer<typeof updateMeetingRoomSchema>
}

export class MeetingRoomService {
  public async create({ user, data }: CreateParams) {
    const {
      name,
      shortName,
      isAvailable,
      capacity,
      minRentalPeriod,
      locationId,
      costPerHolidaysDiscount,
      endOfBookingGap,
      images,
      equipments,
      periodsPrices,
      basePrice,
    } = data

    const meetingRoom = await user.related('meetingRooms').create({
      name,
      shortName,
      isAvailable,
      capacity,
      minRentalPeriod,
      locationId,
      costPerHolidaysDiscount,
      endOfBookingGap,
    })

    await meetingRoom.related('basePrice').create({
      basePricePerHour: basePrice,
    })

    if (images && images.length > 0) {
      await MeetingRoomImage.createMany(
        images.map((image: any) => ({ meetingRoomId: meetingRoom.id, image }))
      )
    }

    if (periodsPrices && periodsPrices.length > 0) {
      await MeetingRoomPricePeriod.createMany(
        periodsPrices.map((periodsPrice) => ({
          meetingRoomId: meetingRoom.id,
          ...periodsPrice,
        }))
      )
    }

    if (equipments && equipments.length > 0) {
      await meetingRoom.related('equipments').attach(equipments)
    }

    return meetingRoom
  }

  public async getById(id: number) {
    return await MeetingRoomModel.findOrFail(id)
  }

  public async list() {
    return await MeetingRoomModel.all()
  }

  public async update({ user, data }: UpdateParams) {
    const {
      id,
      name,
      shortName,
      isAvailable,
      capacity,
      minRentalPeriod,
      locationId,
      costPerHolidaysDiscount,
      endOfBookingGap,
      images,
      equipments,
      periodsPrices,
      basePrice,
    } = data

    const meetingRoom = await user.related('meetingRooms').query().where('id', id).firstOrFail()

    meetingRoom.merge({
      name,
      shortName,
      isAvailable,
      capacity,
      minRentalPeriod,
      locationId,
      costPerHolidaysDiscount,
      endOfBookingGap,
    })

    if (basePrice) {
      const meetingRoomPrice = await MeetingRoomPrice.query().where('meetingRoomId', id).first()

      if (meetingRoomPrice) {
        meetingRoomPrice.basePricePerHour = basePrice
        await meetingRoomPrice.save()
      }
    }

    if (images && images.length > 0) {
      await MeetingRoomImage.query().where('meetingRoomId', id).delete()

      await MeetingRoomImage.createMany(images.map((image) => ({ meetingRoomId: id, image })))
    }

    if (equipments && equipments.length > 0) {
      await meetingRoom.related('equipments').sync(equipments)
    }

    if (periodsPrices && periodsPrices.length > 0) {
      await MeetingRoomPricePeriod.query().where('periodId', id).delete()

      await MeetingRoomPricePeriod.createMany(
        periodsPrices.map((period) => ({ meetingRoomId: id, ...period }))
      )
    }

    return meetingRoom
  }

  public async deleteMeetingRoom(id: number) {
    const meetingRoom = await MeetingRoomModel.findOrFail(id)
    await meetingRoom.delete()
  }
}
