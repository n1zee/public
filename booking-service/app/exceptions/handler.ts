import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { errors as lucidErrors } from '@adonisjs/lucid'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      if (error.status === 422) {
        ctx.response.status(422).send({
          message: error.messages.map((m: any) => m.message),
        })
        return
      }
    }

    if (error instanceof lucidErrors.E_ROW_NOT_FOUND) {
      if (error.status === 404) {
        ctx.response.status(404).send({
          status: error.status,
          message: 'Not Found',
        })
        return
      }
    }
  }

  /**
   * The method is used to report error to the logging service or
   * the third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
