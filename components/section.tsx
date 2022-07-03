import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Section = ({ children }: Props) => {
  return <section className="mb-32">{children}</section>
}

export default Section
