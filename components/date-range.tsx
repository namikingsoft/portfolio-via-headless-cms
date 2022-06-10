import { MdDateRange } from 'react-icons/md'
import DateFormatter from './date-formatter'

type Props = {
  date: string
  dateEnd?: string
  isContinue: boolean
}

const DateRange = ({ date, dateEnd, isContinue }: Props) => {
  return (
    <div className="flex flex-row items-center">
      <MdDateRange className="mr-1" />
      <DateFormatter dateString={date} />
      {(dateEnd != null || isContinue) && <span className="mx-1">〜</span>}
      {dateEnd != null && <DateFormatter dateString={dateEnd} />}
    </div>
  )
}

export default DateRange
