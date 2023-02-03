export class CurrentTime {
  public date: Date
  private readonly weekDayMap = new Map()

  constructor (date: Date) {
    this.date = date

    const weekDayMap = this.weekDayMap
    weekDayMap.set(0, '周日')
    weekDayMap.set(1, '周一')
    weekDayMap.set(2, '周二')
    weekDayMap.set(3, '周三')
    weekDayMap.set(4, '周四')
    weekDayMap.set(5, '周五')
    weekDayMap.set(6, '周六')
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  setDate (date: Date) {
    this.date = date
  }

  getWeekDay (): string {
    return this.weekDayMap.get(this.date.getDay())
  }

  formatterTime (format = 'yyyy-MM-dd hh:mm:ss'): string {
    interface timeType {
      yyyy: string
      MM: string
      M: string
      dd: string
      d: string
      hh: string
      h: string
      mm: string
      m: string
      ss: string
      s: string
    }

    const date = this.date
    const obj: timeType = {
      yyyy: date.getFullYear().toString(),
      MM: (date.getMonth() + 1) <= 9 ? ('0' + (date.getMonth() + 1).toString()) : (date.getMonth() + 1).toString(),
      M: (date.getMonth() + 1).toString(),
      dd: date.getDate() <= 9 ? ('0' + date.getDate().toString()) : date.getDate().toString(),
      d: date.getDate().toString(),
      hh: date.getHours() <= 9 ? ('0' + date.getHours().toString()) : date.getHours().toString(),
      h: date.getHours().toString(),
      mm: date.getMinutes() <= 9 ? ('0' + date.getMinutes().toString()) : date.getMinutes().toString(),
      m: date.getMinutes().toString(),
      ss: date.getSeconds() <= 9 ? ('0' + date.getSeconds().toString()) : date.getSeconds().toString(),
      s: date.getSeconds().toString()
    }

    let key: keyof timeType
    for (key in obj) {
      const value = obj[key]
      format = format.replace(key, value)
    }
    return format
  }
}
