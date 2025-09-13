import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export function formatFullTime(
  timestamp?: string | Date,
  locale?: string,
  format = "'DD/MM/YYYY HH:mm:ss'",
) {
  if (!timestamp) return
  dayjs.locale(locale)
  const date = dayjs.utc(timestamp).tz('Asia/Ho_Chi_Minh')
  const formattedDate = date.format(format)
  const relativeTime = date.fromNow()
  return `${formattedDate} (${relativeTime})`
}

export function formatTime(time?: string | Date, format?: string, tz: string = 'Asia/Ho_Chi_Minh') {
  if (!time) return

  const d = dayjs.utc(time).tz(tz)
  return format ? d.format(format) : d
}
