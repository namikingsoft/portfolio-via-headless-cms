import { useRouter } from 'next/router'
import { FocusEventHandler, useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { useAuthenticateMutation } from '../schemas/bff/client'
import {
  siteName,
  passwordLength,
  redirectUriSearchParamsName,
} from '../lib/constants'
import { pagesPath } from '../lib/$path'
import { parseToFormValidationErrors } from '../schemas/bff/errors'

type FieldValues = {
  password: string
}

const isFormFieldName = (fieldName: string): fieldName is keyof FieldValues =>
  fieldName === 'password'

const Index = () => {
  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  const [result, authenticate] = useAuthenticateMutation()

  const disabled = result.fetching || redirecting

  const {
    register,
    setFocus,
    setError,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>()

  const onSubmit = useCallback(
    async ({ password }: FieldValues) => {
      event?.preventDefault()

      const result = await authenticate({ input: { password } })
      if (result.error?.graphQLErrors) {
        console.log('result.error', result.error?.graphQLErrors)
        const errors = parseToFormValidationErrors(result.error?.graphQLErrors)
        console.log('errors', errors)
        errors.forEach((err) => {
          if (isFormFieldName(err.fieldName))
            setError(err.fieldName, { message: err.fieldMessage })
        })
      } else {
        setRedirecting(true)
        const searchParams = new URLSearchParams(location.search)
        const redirectUri = searchParams.get(redirectUriSearchParamsName)
        router.push(
          redirectUri?.startsWith(pagesPath.private.$url().pathname)
            ? redirectUri
            : pagesPath.private.$url().pathname,
        )
      }
    },
    [router],
  )

  const onPaste = useCallback(() => {
    // NOTE: value is previous before setTimeout
    setTimeout(() => {
      const value = getValues('password')
      if (value && value.length >= passwordLength) handleSubmit(onSubmit)()
    }, 0)
  }, [])

  const onFocus: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
    const elem = event.currentTarget
    if (elem instanceof HTMLInputElement) {
      elem.setSelectionRange(0, elem.value.length)
    }
  }, [])

  useEffect(() => {
    setFocus('password')
  }, [])

  return (
    <>
      <Head>
        <title>Next.js Blog Example with {siteName}</title>
      </Head>
      <form className="my-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex border rounded-md overflow-hidden border-teal-500">
          <input
            className="appearance-none border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            type="password"
            placeholder="Paste password"
            aria-label="Password"
            onFocus={onFocus}
            onPaste={onPaste}
            disabled={disabled}
            {...register('password')}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded-r disabled:bg-gray-400 disabled:border-gray-400"
            type="submit"
            disabled={disabled}
          >
            Login
          </button>
        </div>
        <p className="text-red-500 text-xs italic">
          {
            // render nbsp for prevent layout shift
            errors.password ? errors.password.message : <>&nbsp;</>
          }
        </p>
      </form>
    </>
  )
}

export default Index
