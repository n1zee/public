import vine from '@vinejs/vine'

export const locationSchema = vine.object({
  name: vine.string(),
  cityId: vine.number().exists({ table: 'cities', column: 'id' }),
  address: vine.string(),
  shortNane: vine.string().optional(),
  phone: vine.string().optional(),
  pathDescription: vine.string().optional(),
  pathImage: vine.string().optional(),
  pathVideo: vine.string().optional(),
  coordinates: vine.string().optional(),
  email: vine.string().optional(),
  website: vine.string().optional(),
  socialLinks: vine.string().optional(),
  openingHours: vine.string().optional(),
  description: vine.string().optional(),
  districtId: vine.number().optional(),
  metroStationIds: vine.array(vine.number()).optional(),
  locationImages: vine.array(vine.string()).optional(),
})

export const crateLocationValidator = vine.compile(locationSchema)

export const updateLocationValidator = vine.compile(
  vine.object({
    ...locationSchema.getProperties(),
    name: vine.string().optional(),
    address: vine.string().optional(),
    cityId: vine.number().exists({ table: 'cities', column: 'id' }).optional(),
    id: vine.number().exists({ table: 'locations', column: 'id' }),
  })
)
