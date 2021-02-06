function init() {
	var picker1 = $('#datetimepicker1').datetimepicker({
		format: 'YYYY-MM-DD',
		minDate: '2018-01-01',
		maxDate: new Date()
	});
	
	var date = $("#dailyEnglishDate").val();
	getDailyEnglishInfo(date);
	
	picker1.on('dp.change', function (e) {
		var date = $("#dailyEnglishDate").val();
		getDailyEnglishInfo(date);
	});
}

init();

function getDailyEnglishInfo(date) {
	$.ajax({
		url: "/dailyEnglish/getDailyEnglish",
		type: "get",
		dataType: "json",
		data: {
			date: date
		},
		success: function(data) {
			analyseTranslation(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
	});
}

function addP(text) {
	return "<p>" + text + "</p>";
}

function addPRight(text) {
	return "<p style=\"text-align: right;\">" + text + "</p>";
}

function addStrong(text) {
	return "<strong>" + text + "</strong>";
}

function addSpanPlay(url) {
	return "&nbsp;<span id=\"play\" class=\"iconfont icon-audio-high\" style=\"cursor:pointer\" onclick=\"play('" + url + "')\"></span>";
}

function addSpanBold(text) {
	return "<span class=\"dailyEnglish\" style=\"font-size: 23px;\">" + text + "</span>";
}

function addSpanSize(text) {
	return "<span  style=\"font-size: 18px;\">" + text + "</span>";
}

function addImg(url) {
	return "<img src=\"" + url + "\" class=\"img-rounded\">";
}

function addBR() {
	return "<br />";
}

function analyseTranslation(data) {
	// console.log(data);
	
	var text = "";
	var English = data.dailyEnglishData.content;
	var Chinese = data.dailyEnglishData.note;
	var pictrueUrl = data.dailyEnglishData.picture2;
	var audioUrl = data.dailyEnglishData.tts;
	
	text += addBR();
	text += addP(addImg(pictrueUrl));
	text += addBR();
	text += addP(addStrong(addSpanBold(English)) + addSpanPlay(audioUrl));
	if ($(document.body).outerWidth(true) < 768) {
		text += addP(addSpanSize(Chinese + "—— " + $("#dailyEnglishDate").val()));
	} else {
		text += addPRight(addSpanSize(Chinese));
		text += addPRight(addSpanSize(" —— " + $("#dailyEnglishDate").val()));
	}
	
	$('#dailyEnglishShow').empty();
	$('#dailyEnglishShow').append(text);
}

function play(url) {
	var audio = new Audio(url);
	audio.play(); //播放
	$('#play').css('color', '#409FB5');
	$('#play').attr('onclick', "");
	audio.addEventListener('ended', function() {
		$('#play').css('color', '');
		$('#play').attr('onclick', "play('" + url + "')");
	}, false);
}

$(window).resize(function() {
	// console.log($(document.body).outerWidth(true));
	if ($(document.body).outerWidth(true) < 768) {
		$('#vocabulary').attr('href', 'vocabulary.html');
	} else {
		$('#vocabulary').attr('href', '#');
	}
});
if ($(document.body).outerWidth(true) < 768) {
	$('#vocabulary').attr('href', 'vocabulary.html');
} else {
	$('#vocabulary').attr('href', '#');
}
