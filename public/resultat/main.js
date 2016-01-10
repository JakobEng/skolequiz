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

	var translate = [
		{val: answers.male.ageY, gender: 'male', age: 'ageY'},
		{val: answers.male.ageM, gender: 'male', age: 'ageM'},
		{val: answers.male.ageE, gender: 'male', age: 'ageE'},
		{val: answers.female.ageY, gender: 'female', age: 'ageY'},
		{val: answers.female.ageM, gender: 'female', age: 'ageM'},
		{val: answers.female.ageE, gender: 'female', age: 'ageE'}
	]

	translate.forEach(function(obj) {
		if(obj.val.length === 0) {
			return answers[obj.gender][obj.age] = 0
		}
		var trues = 0
		obj.val.forEach(function(answer1) {
			answer1.forEach(function(answer2) {
				if(answer2 === true) {
					trues += 1
				}
			})
		})
		obj.val = trues / obj.val.length * 10
		answers[obj.gender][obj.age] = obj.val
	})

	function makeArrage(myArray) {
		var emaleTjek = 0
		var counter = 0
		myArray.forEach(function(val) {
			if(val !== 0) {
				emaleTjek += val
				counter += 1
			}
		})

		return emaleTjek / counter
	}

	var bar = [
		{bar: 0, value: makeArrage([answers.female.ageY, answers.female.ageM, answers.female.ageE])},
		{bar: 1, value: makeArrage([answers.male.ageY, answers.male.ageM, answers.male.ageE])},
		{bar: 2, value: answers.female.ageY},
		{bar: 3, value: answers.male.ageY},
		{bar: 4, value: makeArrage([answers.female.ageY, answers.male.ageY])},
		{bar: 5, value: makeArrage([answers.female.ageM, answers.male.ageM])},
		{bar: 6, value: makeArrage([answers.female.ageE, answers.male.ageE])},
		{bar: 7, value: answers.female.ageM},
		{bar: 8, value: answers.male.ageM},
		{bar: 9, value: answers.male.ageE},
		{bar: 10, value: answers.female.ageE}
	]

	bar.forEach(function(val) {
		if(isNaN(bar.value)) value = 0
		$($('.bar')[val.bar]).attr('style', 'height: ' + val.value +'%;')
		$($('.bar')[val.bar]).html('<span>' + val.value +'%</span>')
	})

	$('#users').html(json.length + ' har svaret på quizen')
}
