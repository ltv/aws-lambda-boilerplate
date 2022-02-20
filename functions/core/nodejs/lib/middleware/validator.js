import { StatusCodes } from 'http-status-codes'
import { Response } from '../response.js'
import createValidator from '../validator.js'

/**
 * @author: @lucduong
 *
 * The validator use `fastest-validator` package, please refer to the documentation: https://github.com/icebob/fastest-validator
 */
export default ({ schema, options = {} }) => {
  const v = createValidator(options)
  const check = v.compile(schema)

  return {
    before: ({ event }) => {
      const result = check(event?.params)
      if (result === true) {
        return
      }

      return new Response().status(StatusCodes.BAD_REQUEST).body({ errors: result })
    },
  }
}
