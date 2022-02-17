import jwt from 'jsonwebtoken'

export async function baseAuthorizer(evt, ctx) {
  const response = {
    statusCode: 200,
    body: JSON.stringify({ event: evt, context: ctx }),
  }
  console.log('[baseAuthorizer] > isValid: ', jwt.verify('Test'))
  console.log('[baseAuthorizer] > response: ', response)
  return response
}
