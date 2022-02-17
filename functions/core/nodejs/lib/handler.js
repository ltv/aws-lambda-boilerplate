import middy from '@middy/core'
import httpErrorHandler from '@middy/http-error-handler'
import jsonBodyParser from '@middy/http-json-body-parser'
import httpResponseSerializer from '@middy/http-response-serializer'
import warmup from '@middy/warmup'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import httpEventNormalizer from './middleware/http-event-normalizer.js'
import meta from './middleware/meta.js'
import normalizeEventParams from './middleware/normalize-event-params.js'
import validator from './middleware/validator.js'
import { Response } from './response.js'

/**
 *
 * @param { name, params, handler, middlewares } options
 * @returns
 */
export const createHandler = (options) => {
  const handler = isFunction(options) ? options : options.handler
  if (!isFunction(handler)) {
    throw new SyntaxError('the handler must be a function')
  }
  const opts = Object.assign({}, isFunction(options) ? {} : options)

  opts.kind = opts.kind || (opts.name && p(opts.name)) || 'UnknownKind'
  // const actionName = opts.name || 'unknown';
  const res = new Response().kind(opts.kind)

  const respSerializerMiddleware = () =>
    httpResponseSerializer({
      serializers: [
        {
          regex: /^application\/json$/,
          serializer: ({ body }) => (isString(body) ? body : res.body(body)),
        },
        {
          regex: /^text\/plain$/,
          serializer: ({ body }) => body,
        },
      ],
      default: 'application/json',
    })

  const mHandler = middy(handler)
    .use(warmup())
    .use({
      before({ event, context }) {
        context.res = res
        if (!event.body) {
          event.body = '{}'
        }
      },
    })
    .use(httpEventNormalizer())
    .use(jsonBodyParser())
    .use(normalizeEventParams())
    .use(meta())
    .use(respSerializerMiddleware())
    .use(httpErrorHandler())

  if (!isEmpty(opts.params)) {
    mHandler.use(validator({ schema: opts.params }))
  }
  if (isArray(opts.middlewares)) {
    opts.middlewares.forEach((middleware) => mHandler.use(middleware))
  }

  return mHandler
}
