(function() {
  var socket = io()
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
      this.clickAble = true;
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
        if(self.clickAble) {
          self.clickAble = false
          var parent = $(this).parent().attr('id')
          $(this).addClass('guess')
          $('#' + parent).hide('drop', {direction: 'left'}, 500)
          parent = Number(parent.substring(8, parent.length)) + 1
          setTimeout(function() {
            $('#question' + parent).show('drop', {direction: 'right'}, 500)
            self.clickAble = true
          }, 501)
          if(parent === 12) {

            var postData = {
              gender: $('#gender').val(),
              age: $('#age').val(),
              answers: []
            }
            var trues = 0
            for(var i = 0; i < $('.guess').length; i++) {
              var value = $($('.guess')[i]).attr('value') === "true";
              postData.answers.push(value)
              if(value === true) trues += 1
            }
            $('#rigtige').html(trues)
            postData = JSON.stringify(postData)
            console.log(postData)
            socket.emit('post mode', postData)

            $('.guess').removeClass('guess')
            setTimeout(function() {
              $('#question' + parent).hide('drop', {direction: 'right'}, 500)
            }, 15000)
            setTimeout(function() {
              $('#welcome').show('drop', {direction: 'left'}, 500)
            }, 15501)
          }
        }
      })
    }
  };

  question.init();
})()
