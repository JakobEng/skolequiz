const file = 'politik'

$(document).ready(function() {

	let socket = io()

	socket.on('update ' + file, results => {
		console.log(results)
		start(results)
	})
})
