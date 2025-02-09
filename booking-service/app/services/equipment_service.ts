import EquipmentModel from '#models/equipment'
import User from '#models/user'

type Params = {
  user: User
  data: Record<string, any>
}

export class EquipmentService {
  public async createEquipment(params: Params) {
    const { user, data } = params

    return await user.related('equipments').create(data)
  }

  public async getEquipments() {
    return EquipmentModel.query().orderBy('id')
  }

  public async getUserEquipments(user: User) {
    return user.related('equipments').query().orderBy('id')
  }

  public async getEquipment(id: number) {
    return EquipmentModel.findOrFail(id)
  }

  public async updateEquipment(data: Record<string, any>) {
    const equipment = await EquipmentModel.findOrFail(data.id)

    equipment.merge(data)
    await equipment.save()

    return equipment
  }

  public async deleteEquipment(id: number) {
    const equipment = await EquipmentModel.findOrFail(id)

    await equipment.delete()
  }
}
