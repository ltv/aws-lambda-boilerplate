export default () => ({
  before: (request) => {
    const { event, context } = request
    const { authorization = '' } = event.headers
    const [, token] = authorization.split(' ')

    const authorizer = event?.requestContext?.authorizer?.lambda
    if (!authorizer) {
      return
    }
    event.user = {
      id: authorizer.userId,
    }
    event.meta = {
      userId: authorizer.userId,
      token,
    }
    context.meta = event.meta
  },
})
