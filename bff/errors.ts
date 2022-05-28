import type { GraphQLError } from 'graphql'

type FormValidationError = {
  fieldName: string
  fieldMessage: string
}

const isFormValidationError = (x: any): x is FormValidationError =>
  'fieldName' in x && 'fieldMessage' in x

export const parseToFormValidationErrors = (
  errors: GraphQLError[],
): FormValidationError[] =>
  errors
    .map((err) => {
      const originalError = err.originalError
      if (isFormValidationError(originalError)) {
        return originalError
      }
      return null
    })
    .flatMap((x) => (x === null ? [] : [x]))

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
