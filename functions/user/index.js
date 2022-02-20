import { allUsersSchema, getUserSchema } from './functions.js'
import { createHandler } from '/opt/core/handler'

export const allUsers = createHandler(allUsersSchema)
export const getUser = createHandler(getUserSchema)
