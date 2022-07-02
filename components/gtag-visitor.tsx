import { ReactNode } from 'react'
import { useGetVisitorQuery } from '../schemas/bff/client'
import { useGtagUserId } from './gtag-provider'

type Props = {
  children: ReactNode
}
const GtagVisitor = ({ children }: Props) => {
  const [result] = useGetVisitorQuery()

  useGtagUserId(result.data?.visitor.username)

  return <>{children}</>
}

export default GtagVisitor
