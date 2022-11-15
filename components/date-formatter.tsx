import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
  dateFormat: string
}

const DateFormatter = ({ dateString, dateFormat }: Props) => {
  const date = parseISO(dateString)
  // eslint-disable-next-line no-tabs
  return <time dateTime={dateString}>{format(date, dateFormat)}</time>
}

export default DateFormatter
