$(document).ready(function() {
	var factions = ['energy', 'growth', 'decay', 'order'];
	var scrolls;
	getScrollsJSON();

	var answer;

	$('#btnStart').on('click', function() {
		$('#picture').empty();
		$('#answers').empty();
		startQuiz();
	});

	 $('#answers').on('click', '.answerBtn', function () { 
	 	var clickedAnswer = event.target.id;
	 	console.log("id: "+event.target.id);
		if(event.target.id == answer) {
			for(var i = 0; i < 4; i++) {
				if(i == answer) {
					$('#'+i).addClass('rightAnswer');
				}
				else {
					$('#'+i).addClass('wrongAnswer');
				}
			}
		} 
	});

	function testFunction() {
		console.log("TEST");
	}

	function startQuiz() {
		var faction = factions[Math.floor(Math.random()*factions.length)];
		answer = Math.floor(Math.random() * 4);
		getScrolls(faction);
	}

	function getScrolls(faction) {
		for(var i = 0; i < 4; i++) {
			getFlavorForID(getRandomScrollID(), faction, i);
		}
	}

	function getRandomScrollID() {
		return Math.floor((Math.random() * scrolls.length-1)+1);
	}

	function getFlavorForID(id, faction, index) {
		var flavor = scrolls[id].flavor;
		var scrollFaction;
		if(scrolls[id].costgrowth > 0) {
			scrollFaction = 'growth';
		} else if(scrolls[id].costorder > 0) {
			scrollFaction = 'order';
		} else if(scrolls[id].costdecay > 0) {
			scrollFaction = 'decay';
		} else if(scrolls[id].costenergy > 0) {
			scrollFaction = 'energy';
		}
		if(flavor == "" || flavor == undefined || scrollFaction != faction) {
			getFlavorForID(getRandomScrollID(), faction, index);
			return;
		}
		else {
			if(index == answer) {
				showImage(scrolls[id].image);
			}
			showFlavor(flavor, index);
   		}
	}

	function getScrollsJSON() {
		var url = 'http://a.scrollsguide.com/scrolls';
	    sendJsonRequest(url);
	}

	function sendJsonRequest(url) {
		$.getJSON(url, function (json) {
			scrolls = json.data;
    	});
	}

	function showFlavor(flavor, id) {
		var button = '<button class="answerBtn" id='+ id +'>' + flavor + '</button> <br>';
		$('#answers').append(button);
	}

	function showImage(id) {
		var image =  '<img class="columnElement scroll" id="img'+id+'" src="'+getImageFromID(id)+'"/>';
		$('#picture').append(image);
	}

	function getImageFromID(imageID) {
		return 'http://scrolldier.com/resources/cardImages/'+imageID+'.png';
	}
});