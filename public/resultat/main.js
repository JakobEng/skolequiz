$(document).ready(function() {

	ajax()

	reqeater(function(data) {
	  data(reqeater)
	})

});

function reqeater(callback) {
	setTimeout(function() {
		ajax()
		callback(reqeater)
	}, 2000)
}

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
			} else if(answer.age === '36-44 år') {
				answers.male.ageM.push(answer.answers)
			} else if(answer.age === '45 år eller ældre') {
				answers.male.ageE.push(answer.answers)
			}
		} else if(answer.gender === 'female') {
			if(answer.age === '35 år eller yngre') {
				answers.female.ageY.push(answer.answers)
			} else if(answer.age === '36-44 år') {
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

	var femaleTjek = 0
	var counter = 0
	if(answers.female.ageY !== 0) {
		femaleTjek += answers.female.ageY
		counter += 1
	}
	if(answers.female.ageM !== 0) {
		femaleTjek += answers.female.ageM
		counter += 1
	}
	if(answers.female.ageE !== 0) {
		femaleTjek += answers.female.ageE
		counter += 1
	}
	answers.female.ageA = femaleTjek / counter

	var maleTjek = 0
	counter = 0
	if(answers.male.ageY !== 0) {
		maleTjek += answers.male.ageY
		counter += 1
	}
	if(answers.male.ageM !== 0) {
		maleTjek += answers.male.ageM
		counter += 1
	}
	if(answers.male.ageE !== 0) {
		maleTjek += answers.male.ageE
		counter += 1
	}
	answers.male.ageA = maleTjek / counter

	setBar(0, answers.female.ageA)
	setBar(1, answers.male.ageA)
	setBar(2, answers.female.ageY)
	setBar(3, answers.male.ageY)

	function rounded(bar, firstAnswer, socundAnswer) {
		if((firstAnswer !== 0) && (socundAnswer !== 0)) {
			setBar(bar, (firstAnswer + socundAnswer) / 2)
		} else if((firstAnswer === 0) && (socundAnswer === 0)) {
			setBar(bar, 0)
		} else if(firstAnswer === 0) {
			setBar(bar, socundAnswer)
		} else if(socundAnswer === 0) {
			setBar(bar, firstAnswer)
		}
	}
	rounded(4, answers.female.ageY, answers.male.ageY)
	rounded(5, answers.female.ageM, answers.male.ageM)
	rounded(6, answers.female.ageE, answers.male.ageE)

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
		if(isNaN(value)) value = 0
		$($('.bar')[i]).attr('style', 'height: ' + value +'%;')
		$($('.bar')[i]).html('<span>' + value +'%</span>')
	}
}
