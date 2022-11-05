import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FocusEventHandler, useCallback, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import Head from 'next/head'
import { useAuthenticateMutation } from '../schemas/bff/client'
import { passwordLength, redirectUriSearchParamsName } from '../lib/constants'
import { pagesPath } from '../lib/$path'
import { parseToFormValidationErrors } from '../schemas/bff/errors'
import Container from '../components/container'

type FieldValues = {
  password: string
}

const isFormFieldName = (fieldName: string): fieldName is keyof FieldValues =>
  fieldName === 'password'

const Index = () => {
  const { t } = useTranslation()

  const router = useRouter()
  const [redirecting, setRedirecting] = useState(false)

  const [result, authenticate] = useAuthenticateMutation()

  const loading = result.fetching || redirecting

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
        const errors = parseToFormValidationErrors(result.error?.graphQLErrors)
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
        <title>{`${t('siteName')} | ${t('siteDescription')}`}</title>
      </Head>
      <Container narrow>
        <form className="my-20" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex rounded-md overflow-hidden h-10">
            <input
              className="appearance-none border-none bg-slate-200 w-full text-gray-700 text-md px-4 leading-tight focus:outline-none"
              type="password"
              placeholder="Paste password"
              aria-label="Password"
              onFocus={onFocus}
              onPaste={onPaste}
              disabled={loading}
              {...register('password')}
            />
            <button
              className="flex-shrink-0 bg-teal-700 hover:bg-teal-900 border-teal-700 text-white text-center rounded-r disabled:bg-gray-400"
              type="submit"
              disabled={loading}
            >
              <div className="flex justify-center w-16 text-base">
                {loading ? (
                  <div className="animate-spin h-5 w-5 border-2 opacity-50 border-white rounded-full border-t-transparent"></div>
                ) : (
                  t('login')
                )}
              </div>
            </button>
          </div>
          <p className="text-red-500 text-xs italic">
            {
              // render nbsp for prevent layout shift
              errors.password ? errors.password.message : <>&nbsp;</>
            }
          </p>
        </form>
      </Container>
    </>
  )
}

export default Index

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  }
}
