import { StatusCodes } from 'http-status-codes'

export class Response {
  constructor() {
    this._status = StatusCodes.OK
  }

  status(status) {
    this._status = status || StatusCodes.OK
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
    const resObj = {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: this._status,
      body: JSON.stringify({
        data,
      }),
    }
    if (this._statistics) {
      resObj.statistics = this._statistics || {}
    }
    return resObj
  }
}
