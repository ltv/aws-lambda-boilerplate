import { allUsersSchema, createUserSchema } from '../functions.js'
import { Response } from '/opt/core/response'
import { createValidator } from '/opt/core/validator'

describe('allUsersSchema', () => {
  it('handler is a function', () => {
    expect(typeof allUsersSchema.handler).toBe('function')
  })

  it('return 200 with empty request body', async () => {
    const res = await allUsersSchema.handler({}, { res: new Response() })
    expect(res.statusCode).toBe(200)
  })
})

describe('createUserSchema', () => {
  it('handler is a function', () => {
    expect(typeof createUserSchema.handler).toBe('function')
  })

  it('should be defined with valid validator', () => {
    const v = createValidator()
    const check = v.compile(createUserSchema.params)
    expect(typeof check).toBe('function')
  })

  it('return 200 with valid request body', async () => {
    const res = await createUserSchema.handler(
      { params: { username: 'username', password: 'password' } },
      { res: new Response() },
    )
    expect(res.statusCode).toBe(200)
  })
})
