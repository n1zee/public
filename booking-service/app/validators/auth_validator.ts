import vine from '@vinejs/vine'

export const registrationValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(255),
    password: vine.string().minLength(8).maxLength(255),
    email: vine.string().trim().email().unique({ table: 'users', column: 'email' }),
  })
)
