function getPage(p) {
	$.ajax({
		url: "/vocabulary/getDailyUseCommonVocabulary",
		type: "get",
		dataType: "json",
		data: {
			p: p
		},
		success: function(data) {
			analysePage(data)
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
	});
}

getPage(1);

function addSection(title) {
	return "<section powered-by=\"xiumi.us\" class=\"greenBox\">\
				<section class=\"greenTriangleLeft\"></section>\
				<section class=\"greenSectionText\">\
					<p class=\"greenSectionTextP\">\
						<strong class=\"greenSectionTextStrong\">\
							" + title + "\
						</strong>\
					</p>\
				</section>\
				<section class=\"greenTriangleRight\"></section>\
			</section>";
}

function addRow(imgPath1, imgPath2) {
	return "<div class=\"row\" style=\"margin-bottom: 20px;\">\
				<div class=\"col-md-6\">\
					<img src=\"" + imgPath1 + "\" class=\"img-rounded\" width=\"100%\">\
				</div>\
				<div class=\"col-md-6\">\
					<img src=\"" + imgPath2 + "\" class=\"img-rounded\" width=\"100%\">\
				</div>\
			</div>";
}

function addTable(data) {
	return "<div class=\"table-responsive\" style=\"text-align: justify;font-size: 16px;\">\
				<table class=\"table table-bordered\" style=\"margin: 0px;\">\
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

function addTd(VocabularyUUID, English, Chinese) {
	var uk_voice_url = "http://dict.youdao.com/dictvoice?type=1&audio=" + encodeURIComponent(English);
	var us_voice_url = "http://dict.youdao.com/dictvoice?type=0&audio=" + encodeURIComponent(English);
	return "<td style=\"height: 22px;\">\
				<p style=\"margin: 0;\">\
					" + English + " &nbsp;\
					英 <span id=\"" + VocabularyUUID + "-1\" class=\"iconfont icon-audio-high\" onclick=\"playUkSpeech('" + VocabularyUUID + "', '" + uk_voice_url + "')\"></span>&nbsp;\
					美 <span id=\"" + VocabularyUUID + "-a\" class=\"iconfont icon-audio-high\" onclick=\"playUsSpeech('" + VocabularyUUID + "', '" + us_voice_url + "')\"></span>&nbsp;\
					&nbsp;" + Chinese + "\
				</p>\
			</td>";
}

function addBR() {
	return "<br>";
}

function analysePage(data) {
	// console.log(data);
	var page = -1;
	var pageSum = -1;
	var text = "";
	$.each(data, function(v, vocabularyDtosList) {
		if(v == "page") {
			page = vocabularyDtosList;
		}else if(v == "pageSum") {
			pageSum = vocabularyDtosList;
		}else if(v.indexOf("vocabularyDtosList") != -1) {
			var title = "";
			var imgPath1 = "";
			var imgPath2 = "";
			var table = "";
			$.each(vocabularyDtosList, function(key, vocabularyDtos) {
				if(key == "vocabularyDtosList") {
					var VocabularyUUID = "";
					var English = "";
					var Chinese = "";
					var Trs = "";
					var Tds = "";
					$.each(vocabularyDtos, function(i, vocabularyDto) {
						VocabularyUUID = vocabularyDto.vocabularyUUID;
						English = vocabularyDto.vocabularyTitle;
						Chinese = vocabularyDto.vocabularyContent;
						Tds += addTd(VocabularyUUID, English, Chinese);
						if((i + 1) % 4 == 0) {
							if(i + 1 == vocabularyDtos.length) {
								Trs += addTrLast(Tds);
							}else{
								Trs += addTr(Tds);
							}
							Tds = "";
						}
					});
					if(Tds != "") {
						Trs += addTrLast(Tds);
					}
					table = addTable(Trs);
				}else if(key == "pictureDtosList") {
					$.each(vocabularyDtos, function(i, pictureDto) {
						if(i == 0) {
							imgPath1 = pictureDto.picturePath;
							title = pictureDto.pictureContent;
							title = title.replace("daily-use-common-vocabulary-", "");
							title = title.replace("-1", "");
						}else if(i == 1) {
							imgPath2 = pictureDto.picturePath;
						}
					});
				}
			});
			text += addSection(title) + addRow(imgPath1, imgPath2) + table + addBR();
		}
	});
	$('#display').empty();
	$('#display').append(text);
	pageTurn(page, pageSum);
}

function addPagePrevious(p) {
	return "<li><a href=\"#\" onclick=\"getPage(" + p + ")\">&lt;</a></li>";
}

function addPagePreviousDisabled() {
	return "<li class=\"disabled\"><span>&lt;</span></li>";
}

function addPageNext(p) {
	return "<li><a href=\"#\" onclick=\"getPage(" + p + ")\">&gt;</a></li>";
}

function addPageNextDisabled() {
	return "<li class=\"disabled\"><span>&gt;</span></li>";
}

function addPageNum(p) {
	return "<li><a href=\"#\" onclick=\"getPage(" + p + ")\">" + p + "</a></li>";
}

function addPageNumActive(p) {
	return "<li class=\"active\"><span>" + p + "</span></li>";
}

function addPageOther() {
	return "<li class=\"disabled\"><span style=\"padding-left:10px;padding-right:10px;\">...</span></li>";
}

function pageTurn(page, pageSum) {
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
					text += addPagePrevious(page - 1);
				}
			}else if(i == n){
				if(page == pageSum) {
					text += addPageNextDisabled();
				}else{
					text += addPageNext(page + 1);
				}
			}else{
				if(page == i - 1) {
					text += addPageNumActive(i - 1);
				}else{
					text += addPageNum(i - 1);
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
					text += addPagePrevious(page - 1);
				}
			}else if(i == 2) {
				if(page == 1) {
					text += addPageNumActive(1);
				}else{
					text += addPageNum(1);
				}
			}else if(i == 3) {
				if(page == 2) {
					text += addPageNumActive(2);
				}else if(page == 1 || page == 3){
					text += addPageNum(2);
				}else{
					text += addPageOther();
				}
			}else if(i == 4) {
				if(page == 3) {
					text += addPageNumActive(3);
				}else if(page == 1 || page == 2){
					text += addPageNum(3);
				}else if(page == pageSum || page == pageSum - 1 || page == pageSum - 2) {
					text += addPageNum(pageSum - 4);
				}else{
					text += addPageNum(page - 1);
				}
			}else if(i == 5) {
				if(page == 1 || page == 2 || page == 3) {
					text += addPageNum(4);
				}else if(page == pageSum || page == pageSum - 1 || page == pageSum - 2){
					text += addPageNum(pageSum - 3);
				}else{
					text += addPageNumActive(page);
				}
			}else if(i == 6) {
				if(page == pageSum - 2) {
					text += addPageNumActive(pageSum - 2);
				}else if(page == pageSum || page == pageSum - 1){
					text += addPageNum(pageSum - 2);
				}else if(page == 1 || page == 2 || page == 3){
					text += addPageNum(5);
				}else{
					text += addPageNum(page + 1);
				}
			}else if(i == 7) {
				if(page == pageSum - 1) {
					text += addPageNumActive(pageSum - 1);
				}else if(page == pageSum || page == pageSum - 2){
					text += addPageNum(pageSum - 1);
				}else {
					text += addPageOther();
				}
			}else if(i == 8) {
				if (page == pageSum) {
					text += addPageNumActive(pageSum);
				}else{
					text += addPageNum(pageSum);
				}
			}else if(i == 9){
				if(page == pageSum) {
					text += addPageNextDisabled();
				}else{
					text += addPageNext(page + 1);
				}
			}
		}
	}
	
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

$(window).resize(function() {
	// console.log($(document.body).outerWidth(true));
	if ($(document.body).outerWidth(true) < 768) {
		var page = document.getElementById("page");
		page.style.paddingTop = "33px";
		$('#vocabulary').attr('href','vocabulary.html');
	} else {
		var page = document.getElementById("page");
		page.style.paddingTop = "4px";
		$('#vocabulary').attr('href','#');
	}
});

if ($(document.body).outerWidth(true) < 768) {
	var page = document.getElementById("page");
	page.style.paddingTop = "33px";
	$('#vocabulary').attr('href','vocabulary.html');
} else {
	var page = document.getElementById("page");
	page.style.paddingTop = "4px";
	$('#vocabulary').attr('href','#');
}

