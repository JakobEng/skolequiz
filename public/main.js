(function() {

  $.ajax({
    type: 'GET',
    url: '/api',
    success: function(data) {
      console.log(typeof data)
    }
  })

})()
