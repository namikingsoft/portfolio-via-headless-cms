import { GraphQLError } from 'graphql'

export const formatError = (error: GraphQLError) => {
  const originalError =
    // originalError is hidden field
    // @ts-expect-error refs. https://github.com/confuser/graphql-constraint-directive/issues/40
    error.originalError?.originalError ?? error.originalError ?? error

  if (originalError?.code === 'ERR_GRAPHQL_CONSTRAINT_VALIDATION') {
    return { ...originalError, fieldMessage: originalError?.message, ...error }
  }
  return error
}
