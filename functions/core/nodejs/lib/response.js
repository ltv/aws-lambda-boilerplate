import Logger from '@dazn/lambda-powertools-logger'
import { StatusCodes } from 'http-status-codes'

const { OK, CREATED, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = StatusCodes

export class Response {
  constructor() {
    this._status = OK
  }

  kind(kind) {
    this._kind = kind
    return this
  }

  status(status) {
    this._status = status || OK
    return this
  }

  statistics(data) {
    this._statistics = data || {}
    return this
  }

  /**
   * @param {{}} data
   * @returns {{headers: {}, body: {}, statusCode: number}}
   */
  body(data = {}) {
    if (!this._kind) throw new Error('kind is required when creating new response')
    const resObj = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: this._status,
      body: JSON.stringify({
        kind: this._kind,
        data,
      }),
    }
    if (this._statistics) {
      resObj.statistics = this._statistics || {}
    }
    return resObj
  }

  created(data = {}) {
    this._status = CREATED
    return this.body(data)
  }

  notFound({ message, msgId: messageId } = {}) {
    this._status = NOT_FOUND
    if (message)
      return this.body({
        errors: {
          message,
          messageId,
        },
      })
    else return this.body()
  }

  noContent() {
    this._status = NO_CONTENT
    return this.body()
  }

  internalError(error) {
    Logger.error('[internalError] > error: ', error)
    this._status = INTERNAL_SERVER_ERROR
    return this.body({
      errors: {
        message: error.message,
        messageId: error.msgId,
      },
    })
  }
}
