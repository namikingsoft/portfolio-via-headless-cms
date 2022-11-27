import { parseISO, format } from 'date-fns'

type Props = {
  className?: string
  dateString: string
  dateFormat: string
}

const DateFormatter = ({ className, dateString, dateFormat }: Props) => {
  const date = parseISO(dateString)
  // eslint-disable-next-line no-tabs
  return (
    <time className={className} dateTime={dateString}>
      {format(date, dateFormat)}
    </time>
  )
}

export default DateFormatter
