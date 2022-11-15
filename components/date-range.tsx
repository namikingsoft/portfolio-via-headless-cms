import { useTranslation } from 'next-i18next'
import { MdDateRange } from 'react-icons/md'
import DateFormatter from './date-formatter'

type Props = {
  date: string
  dateEnd?: string
  isContinue: boolean
}

const DateRange = ({ date, dateEnd, isContinue }: Props) => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-row items-center">
      <MdDateRange className="mr-1" />
      <DateFormatter dateString={date} dateFormat={t('yyyy/MM')} />
      {(dateEnd != null || isContinue) && <span className="mx-1">〜</span>}
      {dateEnd != null && (
        <DateFormatter dateString={dateEnd} dateFormat={t('yyyy/MM')} />
      )}
      {isContinue && t('ongoing')}
    </div>
  )
}

export default DateRange
