(function() {

  // HUSK dette trick
  /*
  for(var i = 0; i < $('.answer').length; i++) {
    console.log($($('.answer')[i]).attr('value'))
  }
  den finder aller der har en klasse "answer" og giver verdien i "value" tilbage, som skal være true eller false
*/

  var question = {
    init: function() {
      this.cacheDom()
      this.buttonClick()
      this.answerClick()
    },
    cacheDom: function() {
      this.$button = $('button')
      this.$start = $('#start')
      this.$questions = $('.questions')
      this.$question1 = $('#questions')
      this.$answer = $('.answer')
    },
    buttonClick: function() {
      var self = this
      this.$button.click(function() {
        if($(this)[0] === self.$start[0]) {
          $('#welcome').hide('drop', {direction: 'left'}, 500)
          setTimeout(function() {
            $('#question2').show('drop', {direction: 'right'}, 500)
          }, 501)
        }
      })
    },
    answerClick: function() {
      var self = this
      this.$answer.click(function() {
        var parent = $(this).parent().attr('id')
        console.log(parent)
        $(this).addClass('guess')
        $('#' + parent).hide('drop', {direction: 'left'}, 500)
        parent = Number(parent.substring(8, parent.length)) + 1
        setTimeout(function() {
          $('#question' + parent).show('drop', {direction: 'right'}, 500)
        }, 501)
        if(parent === 12) {

          var postData = {
            gender: $('#gender').val(),
            age: $('#age').val(),
            answers: []
          }
          for(var i = 0; i < $('.guess').length; i++) {
            postData.answers.push($($('.guess')[i]).attr('value') === "true")
          }
          postData = JSON.stringify(postData)
          console.log(postData)
          $.ajax({
            type: "POST",
            url:'/api',
            data: postData,
            contentType: "application/json",
            dataType: "json",
            success: function() {
              $('#finish').html('og sendt')
            },
            error: function(err) {
              $('#finish').html('og der skete en fejl sende den')
              console.log(err)
            }
          })

          $('.guess').removeClass('guess')
          setTimeout(function() {
            $('#question' + parent).hide('drop', {direction: 'right'}, 500)
          }, 10000)
          setTimeout(function() {
            $('#welcome').show('drop', {direction: 'left'}, 500)
          }, 10501)
        }
      })
    }
  };

  question.init();

//  var answer = {};
//  $('#submit').click(function() {
//    const gender = $('#gender').val()
//    const age = $('#age').val()
//
//    answer.gender = gender
//    answer.age = age
//  })
})()
