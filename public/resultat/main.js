$(document).ready(function() {
	var json = [{
			gender: "male",
			age: "35 år eller yngre",
			answers: [true,false,true,false,true,true,true,false,false,true]
		}, {
			gender: "female",
			age: "36-45 år",
			answers: [true,false,false,false,true,true,true,false,false,true]
		}, {
			gender: "female",
			age: "45 år eller ældre",
			answers: [true,false,true,false,true,true,true,false,true,true]
		}
	]
	var answers = {
		female: {
			ageY: [],
			ageM: [],
			ageE: []
		},
		male: {
			ageY: [],
			ageM: [],
			ageE: []
		}
	}
	json.forEach(function(answer) {
		if(answer.gender === 'male' && answer.age === '35 år eller yngre') {

		}
	})

	var bar = $('.bar')
	for(var i = 0; i < bar.length; i++) {
		bar[i] = $(bar[i]).attr('style')
		var res = bar[i].substring(8, 11)
		$('.bar').attr('style', bar[i])
	}

});
