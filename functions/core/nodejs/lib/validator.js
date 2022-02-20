import Validator from 'fastest-validator'
import merge from 'lodash/merge'

const defaultOptions = {
  defaults: {
    object: {
      strict: 'remove',
    },
  },
}

export default function createValidator(opts = {}) {
  const options = merge(defaultOptions, opts)
  return new Validator({
    useNewCustomCheckerFunction: true,
    ...options,
  })
}
