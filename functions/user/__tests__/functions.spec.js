import { allUsersSchema, getUserSchema } from '../functions.js'

describe('allUsersSchema', () => {
  it('handler is a function', () => {
    expect(typeof allUsersSchema.handler).toBe('function')
  })
})
