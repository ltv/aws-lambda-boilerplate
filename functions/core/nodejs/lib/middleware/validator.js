import Validator from 'fastest-validator'
import { StatusCodes } from 'http-status-codes'
import merge from 'lodash/merge'
import { Response } from '../response.js'

const defaultOptions = {
  defaults: {
    object: {
      strict: 'remove',
    },
  },
}

/**
 * @author: @lucduong
 *
 * The validator use `fastest-validator` package, please refer to the documentation: https://github.com/icebob/fastest-validator
 */
export default ({ schema, options = {} }) => {
  const v = new Validator(merge(defaultOptions, options))
  const check = v.compile(schema)

  return {
    before: ({ event }) => {
      const result = check(event?.params)
      if (result === true) {
        return
      }

      const res = new Response().kind('BAD_REQUEST')
      return res.status(StatusCodes.BAD_REQUEST).body({ errors: result })
    },
  }
}
