import type { HttpContext } from '@adonisjs/core/http'
import { AuthService } from '#services/auth_service'

export default class AuthController {
  protected authService = new AuthService()

  async register(ctx: HttpContext) {
    try {
      const data = await this.authService.register(ctx)
      return ctx.response.created({ data })
    } catch (error) {
      return ctx.response.badRequest({ error: error.messages || error.message })
    }
  }

  async login(ctx: HttpContext) {
    try {
      const data = await this.authService.login(ctx)
      return ctx.response.created({ data })
    } catch (error) {
      return ctx.response.badRequest({ error: error.messages || error.message })
    }
  }

  async profile(ctx: HttpContext) {
    const data = await this.authService.profile(ctx)
    return ctx.response.ok({ data })
  }
}
