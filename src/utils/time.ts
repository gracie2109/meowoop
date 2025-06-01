import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import 'dayjs/locale/en'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

// Cấu hình dayjs
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
// Đặt locale là tiếng Việt

export function formatFullTime(timestamp, locale) {
  dayjs.locale(locale)
  // Chuyển timestamp sang múi giờ Việt Nam (Asia/Ho_Chi_Minh)
  const date = dayjs.utc(timestamp).tz('Asia/Ho_Chi_Minh')

  // Định dạng ngày/tháng/năm giờ:phút:giây
  const formattedDate = date.format('DD/MM/YYYY HH:mm:ss')

  // Tính thời gian tương đối (bao nhiêu giây/ngày/tuần... trước)
  const relativeTime = date.fromNow()

  // Kết hợp định dạng
  return `${formattedDate} (${relativeTime})`
}
