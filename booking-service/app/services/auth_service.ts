import type { HttpContext } from '@adonisjs/core/http'

import { registrationValidator } from '#validators/auth_validator'

import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export class AuthService {
  public async register({ request }: HttpContext) {
    const data = request.all()
    await registrationValidator.validate(data)

    const user = await User.create(data)
    const token = await User.accessTokens.create(user, ['group:owner'])

    return {
      user,
      token,
    }
  }

  public async login({ request, response }: HttpContext) {
    const data = request.all()
    const user = await User.findBy('email', data.email)

    if (!user) {
      return response.abort('Invalid credentials')
    }

    const isPasswordValid = await hash.verify(user.password, data.password)

    if (!isPasswordValid) {
      return response.abort('Invalid credentials')
    }

    const token = await User.accessTokens.create(user)

    return {
      token,
    }
  }

  public async profile({ auth }: HttpContext) {
    await auth.authenticate()

    return {
      user: auth.user,
    }
  }
}
