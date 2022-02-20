export const allUsersSchema = {
  name: 'allUsers',
  handler: async (event, { res }) => {
    return res.status(200).body([event])
  },
}

export const getUserSchema = {
  name: 'getUser',
  handler: async (event, { res }) => {
    return res.status(200).body([event])
  },
}

export const createUserSchema = {
  name: 'createUser',
  params: {
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
  },
  handler: async (event, { res }) => {
    return res.status(200).body([event])
  },
}

export const updateUser = {
  name: 'updateUser',
  handler: async (event, { res }) => {
    return res.status(200).body([event])
  },
}

export const deleteUser = {
  name: 'deleteUser',
  handler: async (event, { res }) => {
    return res.status(200).body([event])
  },
}
