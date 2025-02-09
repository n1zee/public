import vine from '@vinejs/vine'

export const notNullIdValidator = vine.compile(vine.number())
