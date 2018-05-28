
  const formatTime2 = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()


  return [month, day].map(formatNumber).join('/')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime2: formatTime2
}