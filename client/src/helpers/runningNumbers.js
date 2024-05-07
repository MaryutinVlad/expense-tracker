export default function runningNumbers(value, groupName, duration, interval) {

  let initialValue = 0
  let divider = Math.floor(value / duration)

  let timer = setInterval(() => {
    if (initialValue >= value) {
      clearInterval(timer)
    } else if ((initialValue + divider) > value) {
      initialValue += 1
      document.querySelector(`#${groupName}`).textContent = initialValue
    } else {
      initialValue += divider
      document.querySelector(`#${groupName}`).textContent = initialValue
    }
  }, interval)
}