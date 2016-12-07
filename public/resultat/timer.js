(function() {
  socket.on('timer', time => {
    let minutes = Math.floor(time / 60)
    minutes = (minutes.toString().length < 2) ? '0' + minutes.toString() : minutes.toString()
    console.log(minutes)

    let seconds = (time % 60)
    seconds = (seconds.toString().length < 2) ? '0' + seconds.toString() : seconds.toString()
    $('.time-left').text(`${minutes}:${seconds}`)
  })
})()
