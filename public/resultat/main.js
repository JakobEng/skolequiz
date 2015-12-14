$(document).ready(function() {

	ajax()

	function reqeater(callback) {
	  setTimeout(function() {
			ajax()
	    callback(reqeater)
	  }, 2000)
	}


	reqeater(function(data) {
	  data(reqeater)
	})


	function ajax() {
		console.time("concatenation");
		$.ajax({
			type: 'GET',
			url: '/api',
			success: function(json) {
				start(json)
				console.timeEnd("concatenation");
			},
			error: function(err) {
				console.log(err)
			}
		})
	}
	function start(json) {
		var answers = { female: { ageY: [], ageM: [], ageE: [], ageA: 0 }, male: { ageY: [], ageM: [], ageE: [], ageA: 0 } }
		json.forEach(function(answer) {
			if(answer.gender === 'male') {
				if(answer.age === '35 år eller yngre') {
					answers.male.ageY.push(answer.answers)
				} else if(answer.age === '36-45 år') {
					answers.male.ageM.push(answer.answers)
				} else if(answer.age === '45 år eller ældre') {
					answers.male.ageE.push(answer.answers)
				}
			} else if(answer.gender === 'female') {
				if(answer.age === '35 år eller yngre') {
					answers.female.ageY.push(answer.answers)
				} else if(answer.age === '36-45 år') {
					answers.female.ageM.push(answer.answers)
				} else if(answer.age === '45 år eller ældre') {
					answers.female.ageE.push(answer.answers)
				}
			}
		})

		answers.male.ageY = changeAnswers(answers.male.ageY)

		answers.male.ageM = changeAnswers(answers.male.ageM)

		answers.male.ageE = changeAnswers(answers.male.ageE)

		answers.female.ageY = changeAnswers(answers.female.ageY)

		answers.female.ageM = changeAnswers(answers.female.ageM)

		answers.female.ageE = changeAnswers(answers.female.ageE)

		answers.female.ageA = (answers.female.ageY + answers.female.ageM + answers.female.ageE) / 3

		answers.male.ageA = (answers.male.ageY + answers.male.ageM + answers.male.ageE) / 3

		setBar(0, answers.female.ageA)

		setBar(1, answers.male.ageA)

		setBar(2, answers.female.ageY)

		setBar(3, answers.male.ageY)

		setBar(4, (answers.female.ageY + answers.male.ageY) / 2)

		setBar(5, (answers.female.ageM + answers.male.ageM) / 2)

		setBar(6, (answers.female.ageE + answers.male.ageE) / 2)

		setBar(7, answers.female.ageM)

		setBar(8, answers.male.ageM)

		setBar(9, answers.female.ageE)

		setBar(10, answers.female.ageE)


		function changeAnswers(obj) {
			if(obj.length === 0) {
				return 0
			}
			var trues = 0
			obj.forEach(function(answer1) {
				answer1.forEach(function(answer2) {
					if(answer2 === true) {
						trues += 1
					}
				})
			})
			obj = trues / obj.length * 10
			return obj
		}

		function setBar(i, value) {
			$($('.bar')[i]).attr('style', 'height: ' + value +'%;')
		}
	}
});
