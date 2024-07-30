const getDifferenceInMinutes = (targetTimeStr) => {
  const [targetHours, targetMinutes] = targetTimeStr.split(":").map(Number)

  const now = new Date()

  const targetTime = new Date(now)
  targetTime.setHours(targetHours, targetMinutes, 0, 0)

  const diffMs = targetTime - now

  const diffMins = Math.floor(diffMs / 60000)

  const jam = Math.floor(diffMins / 60)
  const menit = diffMins % 60

  if (jam > 0) {
    return `${jam} jam  lagi`
  } else if (menit > 0) {
    return `${menit} menit lagi`
  } else {
    return null
  }
}

export default getDifferenceInMinutes
