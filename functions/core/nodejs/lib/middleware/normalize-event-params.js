import { jsonSafeParse } from '@middy/util'
import isString from 'lodash/isString'

export default () => ({
  before: async (request) => {
    const { event } = request

    event.params = Object.assign(
      {},
      event.queryStringParameters,
      event.params,
      isString(event.body) ? jsonSafeParse(event.body) : event.body,
    )
  },
})
