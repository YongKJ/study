function getVocabulary(letter, p) {
	$.ajax({
		url: "/vocabulary/getCollegeCET4Vocabulary",
		type: "get",
		dataType: "json",
		data: {
			letter: letter,
			p: p
		},
		success: function(data) {
			analysePage(data, letter);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
	});
}

function addTable(data) {
	return "<div class=\"table-responsive\" style=\"margin-bottom:0px;\">\
				<table class=\"table table-striped\" style=\"margin-bottom:0px;\">\
					<tbody>\
						" + data + "\
					</tbody>\
				</table>\
			</div>";
}

function addTr(data) {
	return "<tr>" + data + "</tr>";
}

function addTrLast(data) {
	return "<tr style=\"border-bottom: 1px solid #ddd;\">\
				" + data + "\
			</tr>";
}

function addTd(VocabularyUUID, English, phonetic, Chinese) {
	var uk_voice_url = "http://dict.youdao.com/dictvoice?type=1&audio=" + encodeURIComponent(English.replace(new RegExp(/△|△ /g), ''));
	var us_voice_url = "http://dict.youdao.com/dictvoice?type=0&audio=" + encodeURIComponent(English.replace(new RegExp(/△|△ /g), ''));
	return "<td>\
				<p style=\"margin: 0;\">\
					" + English + " &nbsp; " + phonetic + " &nbsp;\
					英 <span id=\"" + VocabularyUUID + "-1\" class=\"iconfont icon-audio-high\" onclick=\"playUkSpeech('" + VocabularyUUID + "', '" + uk_voice_url + "')\"></span>\
					美 <span id=\"" + VocabularyUUID + "-a\" class=\"iconfont icon-audio-high\" onclick=\"playUsSpeech('" + VocabularyUUID + "', '" + us_voice_url + "')\"></span>\
					&nbsp; " + Chinese + "\
				</p>\
			</td>";
}

function analyseVocabularyContent(data) {
	var dataArray = data.split("[");
	var dataArrayNew = new Array();
	var phonetic = "";
	for(var i = 0; i < dataArray.length; i++) {
		if(dataArray[i].indexOf(" ") == -1 || dataArray[i].indexOf(" ") > 1) {
			dataArrayNew = dataArray[i].split("]");
			break;
		}
	}
	for(var i = 0; i < dataArrayNew.length; i++) {
		if(dataArrayNew[i].indexOf(" ") == -1 || dataArrayNew[i].indexOf(" ") > 1) {
			phonetic = dataArrayNew[i];
			break;
		}
	}
	return phonetic;
}

function analysePage(data, letter) {
	// console.log(data);
	var page = -1;
	var pageSum = -1;
	var text = "";
	$.each(data, function(v, vocabularyDtosList) {
		if(v == "page") {
			page = vocabularyDtosList;
		}else if(v == "pageSum") {
			pageSum = vocabularyDtosList;
		}else if(v == "vocabularyDtosList") {
			var VocabularyUUID = "";
			var English = "";
			var phonetic = "";
			var Chinese = "";
			var Trs = "";
			$.each(vocabularyDtosList, function(i, vocabularyDto) {
				VocabularyUUID = vocabularyDto.vocabularyUUID;
				English = vocabularyDto.vocabularyTitle;
				phonetic = analyseVocabularyContent(vocabularyDto.vocabularyContent);
				if(phonetic != "") {
					var reStr = "\[" + phonetic + "\]";
					Chinese = vocabularyDto.vocabularyContent.replace(reStr, "");
					phonetic = "/" + phonetic + "/";
				}else{
					Chinese = vocabularyDto.vocabularyContent;
				}
				if(i + 1 == vocabularyDtosList.length) {
					Trs += addTrLast(addTd(VocabularyUUID, English, phonetic, Chinese));
				}else{
					Trs += addTr(addTd(VocabularyUUID, English, phonetic, Chinese));
				}
			});
			text += addTable(Trs);
		}
	});
	$('#display').empty();
	$('#display').append(text);
	pageTurn(page, pageSum, letter);
}

function addPagePrevious(letter, p) {
	return "<li><a href=\"#\" onclick=\"getVocabulary('" + letter + "', " + p + ")\">&lt;</a></li>";
}

function addPagePreviousDisabled() {
	return "<li class=\"disabled\"><span>&lt;</span></li>";
}

function addPageNext(letter, p) {
	return "<li><a href=\"#\" onclick=\"getVocabulary('" + letter + "', " + p + ")\">&gt;</a></li>";
}

function addPageNextDisabled() {
	return "<li class=\"disabled\"><span>&gt;</span></li>";
}

function addPageNum(letter, p) {
	return "<li><a href=\"#\" onclick=\"getVocabulary('" + letter + "', " + p + ")\">" + p + "</a></li>";
}

function addPageNumActive(p) {
	return "<li class=\"active\"><span>" + p + "</span></li>";
}

function addPageOther() {
	return "<li class=\"disabled\"><span style=\"padding-left:8px;padding-right:8px;\">...</span></li>";
}

function pageTurn(page, pageSum, letter) {
	var text = "";
	
	var n = 0;
	if(pageSum >= 7) {
		n = 9;
	}else{
		n = pageSum + 2;
	}
	
	if(n < 9) {
		for(var i = 1; i <= n; i++) {
			if(i == 1) {
				if(page == 1) {
					text += addPagePreviousDisabled();
				}else{
					text += addPagePrevious(letter, page - 1);
				}
			}else if(i == n){
				if(page == pageSum) {
					text += addPageNextDisabled();
				}else{
					text += addPageNext(letter, page + 1);
				}
			}else{
				if(page == i - 1) {
					text += addPageNumActive(i - 1);
				}else{
					text += addPageNum(letter, i - 1);
				}
			}
		}
	}else{
		// console.log(n);
		for(var i = 1; i <= n; i++) {
			if(i == 1) {
				if(page == 1) {
					text += addPagePreviousDisabled();
				}else{
					text += addPagePrevious(letter, page - 1);
				}
			}else if(i == 2) {
				if(page == 1) {
					text += addPageNumActive(1);
				}else{
					text += addPageNum(letter, 1);
				}
			}else if(i == 3) {
				if(page == 2) {
					text += addPageNumActive(2);
				}else if(page == 1 || page == 3){
					text += addPageNum(letter, 2);
				}else{
					text += addPageOther();
				}
			}else if(i == 4) {
				if(page == 3) {
					text += addPageNumActive(3);
				}else if(page == 1 || page == 2){
					text += addPageNum(letter, 3);
				}else if(page == pageSum || page == pageSum - 1 || page == pageSum - 2) {
					text += addPageNum(letter, pageSum - 4);
				}else{
					text += addPageNum(letter, page - 1);
				}
			}else if(i == 5) {
				if(page == 1 || page == 2 || page == 3) {
					text += addPageNum(letter, 4);
				}else if(page == pageSum || page == pageSum - 1 || page == pageSum - 2){
					text += addPageNum(letter, pageSum - 3);
				}else{
					text += addPageNumActive(page);
				}
			}else if(i == 6) {
				if(page == pageSum - 2) {
					text += addPageNumActive(pageSum - 2);
				}else if(page == pageSum || page == pageSum - 1){
					text += addPageNum(letter, pageSum - 2);
				}else if(page == 1 || page == 2 || page == 3){
					text += addPageNum(letter, 5);
				}else{
					text += addPageNum(letter, page + 1);
				}
			}else if(i == 7) {
				if(page == pageSum - 1) {
					text += addPageNumActive(pageSum - 1);
				}else if(page == pageSum || page == pageSum - 2){
					text += addPageNum(letter, pageSum - 1);
				}else {
					text += addPageOther();
				}
			}else if(i == 8) {
				if (page == pageSum) {
					text += addPageNumActive(pageSum);
				}else{
					text += addPageNum(letter, pageSum);
				}
			}else if(i == 9){
				if(page == pageSum) {
					text += addPageNextDisabled();
				}else{
					text += addPageNext(letter, page + 1);
				}
			}
		}
	}
	$('#pageBottom').css('display', 'block');
	$('#page').empty();
	$('#page').append(text);
}

function playUkSpeech(VocabularyUUID, url) {
	var audio = new Audio(url);
	audio.play(); //播放
	$('#' + VocabularyUUID + '-1').css('color', '#409FB5');
	$('#' + VocabularyUUID + '-1').attr('onclick', "");
	audio.addEventListener('ended', function() {
		$('#' + VocabularyUUID + '-1').css('color', '');
		$('#' + VocabularyUUID + '-1').attr('onclick', "playUkSpeech('" + VocabularyUUID + "', '" + url + "')");
	}, false);
}

function playUsSpeech(VocabularyUUID, url) {
	var audio = new Audio(url);
	audio.play(); //播放
	$('#' + VocabularyUUID + '-a').css('color', '#409FB5');
	$('#' + VocabularyUUID + '-a').attr('onclick', "");
	audio.addEventListener('ended', function() {
		$('#' + VocabularyUUID + '-a').css('color', '');
		$('#' + VocabularyUUID + '-a').attr('onclick', "playUsSpeech('" + VocabularyUUID + "', '" + url + "')");
	}, false);
}

function addContainer(data) {
	return "<div class=\"container box-position\">\
				" + data + "\
			</div>";
}

function addBox(letter) {
	return "<div class=\"box\" onclick=\"getVocabulary('" + letter + "', 1)\">\
				<span>" + letter +
		"</span>\
			</div>";
}

function addBoxLast() {
	return "<div class=\"box\" onclick=\"backToChoice()\">\
				<img class=\"img\" src=\"img/preview-prev.svg\" >\
			</div>";
}

function getAlphabet() {
	if ($(document.body).outerWidth(true) < 768) {
		var alphabet = new Array("A", "B", "C", "D", "E", "P", "Q", "R", "S", "T", "F", "G", "H", "I", "J", "U", "V", "W", "X",
			"Y","K", "L", "M", "N", "O", "Z");
	} else {
		var alphabet = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
			"T","U", "V", "W", "X", "Y", "Z");
	}
	
	var text = "";
	var boxs = "";
	for(var i = 0; i < alphabet.length; i++) {
		boxs += addBox(alphabet[i]);
		if((i + 1) % 5 == 0) {
			text += addContainer(boxs);
			boxs = "";
		}
	}
	boxs += addBoxLast();
	text += addContainer(boxs);
	
	// console.log(text.length);
	
	$('#display').empty();
	$('#display').append(text);
}

function backToChoice() {
	var text = "<div class=\"container box-position1\">\
					<div class=\"card\" onclick=\"getVocabulary('A-Z', 1)\">\
						<span>随机排序</span>\
					</div>\
					<div class=\"card\" onclick=\"getAlphabet()\">\
						<span>字母排序</span>\
					</div>\
				</div>";
	$('#display').empty();
	$('#display').append(text);
}

$(window).resize(function() {
	// console.log($(document.body).outerWidth(true));
	if ($(document.body).outerWidth(true) < 768) {
		var page = document.getElementById("page");
		page.style.paddingTop = "33px";
		$('#vocabulary').attr('href', 'vocabulary.html');
	} else {
		var page = document.getElementById("page");
		page.style.paddingTop = "4px";
		$('#vocabulary').attr('href', '#');
	}
});

if ($(document.body).outerWidth(true) < 768) {
	var page = document.getElementById("page");
	page.style.paddingTop = "33px";
	$('#vocabulary').attr('href', 'vocabulary.html');
} else {
	var page = document.getElementById("page");
	page.style.paddingTop = "4px";
	$('#vocabulary').attr('href', '#');
}
