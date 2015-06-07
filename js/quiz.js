$(document).ready(function() {
	var factions = ['energy', 'growth', 'decay', 'order'];
	var scrolls;
	getScrollsJSON();

	var answer;
	var score = 0;

	$('#nextButton').on('click', function() {
		start();
	});

	$('#answers').on('click', '.answerBtn', function (event) { 
	 	var target = event.target;
		
		changeOpacity(target, 0);
		for(var i = 0; i < 4; i++) {
			if(i == answer) {
				$('#'+i).addClass('rightAnswer');
			}
			else {
				$('#'+i).addClass('wrongAnswer');
			}
		}
		if(target.id == answer) {
			score++;
		} 
	});

	$('#answers').on('mouseover', 'a', function(event) {
		var target = event.target;
		console.log(target);
		changeOpacity(target, 0.5);
	});

	$('#answers').on('mouseout', 'a', function(event) {
		var target = event.target;
		changeOpacity(target, 0);
	});

	function changeOpacity(e, opacity) {
		var currentColor = $(e).css('borderTopColor');
		console.log(currentColor);
		var subStringColor = currentColor.split("(");
		var colors = subStringColor[1].split(")");
		console.log(colors);
		var newColor = "rgba("+ colors[0] + ", " + opacity + ")";
		console.log(newColor);
		$(e).css('backgroundColor', newColor);
	}

	function start() {
		$('#picture').empty();
		$('#answers').empty();
		startQuiz();
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
			showFlavor(flavor, index, faction);
   		}
	}

	function getScrollsJSON() {
		var url = 'http://a.scrollsguide.com/scrolls';
	    sendJsonRequest(url);
	}

	function sendJsonRequest(url) {
		$.getJSON(url, function (json) {
			scrolls = json.data;
			start();
    	});
	}

	function showFlavor(flavor, id, faction) {
		var myFlavor = flavor.replace(/\\n/g, '<br />');
		var button = '<a href="#" class="answerBtn ' + faction + '" id='+ id +'>' + myFlavor + '</a> <br>';
		$('#answers').append(button);
	}

	function showImage(id) {
		var image =  '<img class="scrollImg" id="img'+id+'" src="'+getImageFromID(id)+'"/>';
		$('#picture').append(image);
	}

	function getImageFromID(imageID) {
		return 'http://scrolldier.com/resources/cardImages/'+imageID+'.png';
	}
});