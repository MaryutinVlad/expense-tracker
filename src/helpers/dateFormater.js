export default function formatDate() {
  const date = new Date(Date.now())
  const arrayDate = String(date).split(" ").slice(0, 3)

  let weekday = arrayDate[0]
  let dayOfMonth = arrayDate[2]

  if (weekday === "Mon" || weekday === "Fri" || weekday === "Sun") {
    weekday = weekday.concat("day")

  } else if (
    weekday === "Tue"
  ) {
    weekday = weekday.concat("sday")
  } else if (
    weekday === "Wed"
  ) {
    weekday = weekday.concat("nesday")
  } else if (
    weekday === "Thu"
  ) {
    weekday = weekday.concat("rsday")
  } else {
    weekday = weekday.concat("urday")
  }

  if (dayOfMonth.indexOf("1") >= 0 && dayOfMonth.indexOf("1") !== "11") {
    dayOfMonth = dayOfMonth.concat("st")
  } else if (
    dayOfMonth.indexOf("2") >= 0 && dayOfMonth.indexOf("2") !== "12"
  ) {
    dayOfMonth = dayOfMonth.concat("nd")
  } else {
    dayOfMonth = dayOfMonth.concat("th")
  }

  return `${weekday} ${dayOfMonth}`
}