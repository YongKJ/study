function getTranslateInfo() {
	if ($("#q").val().length > 0) {
		$.ajax({
			url: "/translate/getTranslate",
			type: "get",
			dataType: "json",
			data: {
				q: $("#q").val()
			},
			success: function(data) {
				analyseTranslation(data)
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
	}
}

function addBR() {
	return "<br>";
}

function addP(text) {
	return "<p>" + text + "</p>";
}

function addLabel(English, Chinese) {
	var text = "";
	if (typeof($.cookie('userName')) != "undefined") {
		var userName = $.cookie('userName');
		$.ajax({
			url: "/user/checkVocabulary",
			type: "get",
			async : false,
			dataType: "json",
			data: {
				userName: userName,
				English: English
			},
			success: function(data) {
				// console.log(data);
				if(data.vocabularyUUID != "#") {
					text = "<p>" + English + "<span id=\"label-1\" class=\"iconfont icon-label\" style=\"float: right;display: none;\" onclick=\"addVocabulary('" + English + "', '" + Chinese + "')\"></span>\
											  <span id=\"label-2\" class=\"iconfont icon-label\" style=\"float: right;color: #85BFCB;\" onclick=\"delVocabulary('" + data.vocabularyUUID + "')\"></span>\
						    </p>";
				}else{
					text = "<p>" + English + "<span id=\"label-1\" class=\"iconfont icon-label\" style=\"float: right;\" onclick=\"addVocabulary('" + English + "', '" + Chinese + "')\"></span>\
											  <span id=\"label-2\" class=\"iconfont icon-label\" style=\"float: right;color: #85BFCB;display: none;\" onclick=\"delVocabulary('" + data.vocabularyUUID + "')\"></span>\
						    </p>";
				}
				// console.log(text + "---------------1");
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
	}else{
		text = "<p>" + English + "<span id=\"label-1\" class=\"iconfont icon-label\" style=\"float: right;\" onclick=\"addVocabulary('" + English + "', '" + Chinese + "')\"></span>\
								  <span id=\"label-2\" class=\"iconfont icon-label\" style=\"float: right;color: #85BFCB;display: none;\"></span>\
			    </p>";
	}
	// console.log(text + "---------------2");
	return text;
}

function addVocabulary(English, Chinese) {
	// console.log("It works.");
	
	if (typeof($.cookie('userName')) != "undefined") {
		$('#label-1').css('display', 'none');
		$('#label-2').css('display', 'block');
		
		var userName = $.cookie('userName');
		
		console.log(userName);
		$.ajax({
			url: "/user/addVocabulary",
			type: "get",
			dataType: "json",
			data: {
				userName: userName,
				English: English,
				Chinese: Chinese
			},
			success: function(data) {
				// console.log(data);
				$('#label-2').attr('onclick', "delVocabulary('" + data.vocabularyUUID + "')");
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
	}else{
		$('#tips').css('display', 'block');
		$('#tips').empty();
		$('#tips').append(addMessage("无法添加到单词本！", "请登录！"));
		setTimeout(function() {
			$('#tips').css('display', 'none');
		}, 3000);
	}
	
}

function delVocabulary(vocabularyUUID) {
	if (typeof($.cookie('userName')) != "undefined") {
		$('#label-1').css('display', 'block');
		$('#label-2').css('display', 'none');
		
		var userName = $.cookie('userName');
		$.ajax({
			url: "/user/delVocabulary",
			type: "get",
			dataType: "json",
			data: {
				userName: userName,
				vocabularyUUID: vocabularyUUID
			},
			success: function(data) {
				// console.log(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
	}else{
		$('#tips').css('display', 'block');
		$('#tips').empty();
		$('#tips').append(addMessage("无法删除单词本上的单词！", "请登录！"));
		setTimeout(function() {
			$('#tips').css('display', 'none');
		}, 3000);
	}
	
}

function addBasicPhonetic(basicPhonetic) {
	return "[" + basicPhonetic + "]";
}

function addPlayOne(basicUkPhonetic, basicUkSpeech) {
	var data = "";

	if (basicUkPhonetic != "" && basicUkSpeech != "") {
		data = "<p style=\"font-family:'lucida sans unicode',arial,sans-serif;\">英[" + basicUkPhonetic +
			"]<span id=\"play-1\" class=\"iconfont icon-audio-high\" style=\"float: right;\" onclick=\"playUkSpeech('" +
			basicUkSpeech +
			"')\"></span>\
										   <span id=\"play-2\" class=\"iconfont icon-audio-high\" style=\"float: right;color: #409FB5;display: none;\"></span></p>";
	} else if (basicUkPhonetic == "" && basicUkSpeech != "") {
		data =
			"<p style=\"font-family:'lucida sans unicode',arial,sans-serif;\">英<span id=\"play-1\" class=\"iconfont icon-audio-high\" style=\"float: right;\" onclick=\"playUkSpeech('" +
			basicUkSpeech +
			"')\"></span>\
				  <span id=\"play-2\" class=\"iconfont icon-audio-high\" style=\"float: right;color: #409FB5;display: none;\"></span></p>";
	}

	return data;
}

function addPlayTwo(basicUsPhonetic, basicUsSpeech) {
	var data = "";

	if (basicUsPhonetic != "" && basicUsSpeech != "") {
		data = "<p style=\"font-family:'lucida sans unicode',arial,sans-serif;\">美[" + basicUsPhonetic +
			"]<span id=\"play-a\" class=\"iconfont icon-audio-high\" style=\"float: right;\" onclick=\"playUsSpeech('" +
			basicUsSpeech +
			"')\"></span>\
										   <span id=\"play-b\" class=\"iconfont icon-audio-high\" style=\"float: right;color: #409FB5;display: none;\"></span></p>";
	} else if (basicUsPhonetic == "" && basicUsSpeech != "") {
		data =
			"<p style=\"font-family:'lucida sans unicode',arial,sans-serif;\">美<span id=\"play-a\" class=\"iconfont icon-audio-high\" style=\"float: right;\" onclick=\"playUsSpeech('" +
			basicUsSpeech +
			"')\"></span>\
				  <span id=\"play-b\" class=\"iconfont icon-audio-high\" style=\"float: right;color: #409FB5;display: none;\"></span></p>";
	}

	return data;
}

function addWebFirstTitle() {
	return "<p><strong>网络释义：</strong></p>";
}

function addWebElseTitle() {
	return "<p><strong>短语：</strong></p>";
}

function analyseTranslation(data) {
	// console.log(data);

	var query = "";
	var basicPhonetic = "";
	var UkVoice = "";
	var UsVoice = "";
	var basicExplains = "";
	var basicWfs = "";
	var webFirst = "";
	var webElse = "";
	var translation = "";
	
	var Chinese = "";

	$.each(data.translateData, function(key, tData) {
		if (key == "query") {
			query = tData;
		} else if (key == "web") {
			$.each(tData, function(k, web) {
				if (k == 0) {
					var vals = "";
					$.each(web.value, function(v, val) {
						if (v == web.value.length - 1) {
							vals += val;
						} else {
							vals += val + "；";
						}
					});
					webFirst += addP(vals);
				} else {
					var vals = "";
					$.each(web.value, function(v, val) {
						if (v == web.value.length - 1) {
							vals += val;
						} else {
							vals += val + "；";
						}
					});
					webElse += addP(web.key + " &nbsp;" + vals);
				}
			});
		} else if (key == "translation") {
			var trans = "";
			$.each(tData, function(k, tran) {
				if (k == tData.length - 1) {
					trans += tran;
				} else {
					trans += tran + "；";
				}
			});
			translation = addP(trans);
		} else if (key == "basic") {
			var basicUkPhonetic = "";
			var basicUsPhonetic = "";
			var basicUkSpeech = "";
			var basicUsSpeech = "";
			
			var ChineseExplain = "";

			$.each(tData, function(k, bInfo) {
				if (k == "phonetic") {
					basicPhonetic = "<p style=\"font-family:'lucida sans unicode',arial,sans-serif;\">[" + bInfo + "]</p>";
				} else if (k == "uk-phonetic") {
					basicUkPhonetic = bInfo;
				} else if (k == "us-phonetic") {
					basicUsPhonetic = bInfo
				} else if (k == "uk-speech") {
					basicUkSpeech = bInfo;
				} else if (k == "us-speech") {
					basicUsSpeech = bInfo;
				} else if (k == "explains") {
					$.each(bInfo, function(i, explain) {
						basicExplains += addP(explain);
						ChineseExplain += explain + " ";
					});
				} else if (k == "wfs") {
					var wfs = "";
					$.each(bInfo, function(w, wf) {
						wfs += wf.wf.name + "：[" + wf.wf.value + "] &nbsp;";
						if ((w + 1) % 2 == 0) {
							basicWfs += addP(wfs);
							wfs = "";
						}
					});
					if (wfs != "") {
						basicWfs += addP(wfs);
					}
				}
			});

			UkVoice = addPlayOne(basicUkPhonetic, basicUkSpeech);
			UsVoice = addPlayTwo(basicUsPhonetic, basicUsSpeech);
			
			if(basicUsPhonetic == "") {
				Chinese = ChineseExplain;
			}else{
				Chinese = "/" + basicUsPhonetic + "/ " + ChineseExplain;
			}
		}
	});

	if (UkVoice != "" && UsVoice != "") {
		query = addLabel(query, Chinese);
	} else {
		query = addP(query);
	}
	if (webFirst != "") {
		webFirst = addWebFirstTitle() + webFirst;
	}
	if (webElse != "") {
		webElse = addWebElseTitle() + webElse;
	}

	var text = "";
	if (UkVoice == "" && UsVoice == "") {
		if (basicPhonetic != "") {
			text += query;
			text += basicPhonetic;
			text += basicExplains;
			text += basicWfs;
			if (webFirst != "") {
				text += addBR();
				text += webFirst;
			}
			if (webElse != "") {
				text += addBR();
				text += webElse;
			}
		} else {
			if (basicExplains == "" && basicWfs == "" && webFirst == "" && webElse == "") {
				text += translation;
			} else {
				text += query;
				text += basicExplains;
				text += basicWfs;
				if (webFirst != "") {
					text += addBR();
					text += webFirst;
				}
				if (webElse != "") {
					text += addBR();
					text += webElse;
				}
			}
		}

		$('#display-1').empty();
		$('#display-2').empty();
		$('#display-2').append(text);
		$('#display-1').css('display', 'none');
		$('#display-2').css('display', 'block');
	} else {
		text += query;
		text += UkVoice;
		text += UsVoice;
		text += basicExplains;
		text += basicWfs;
		text += addBR();
		text += webFirst;
		text += addBR();
		text += webElse;

		$('#display-1').empty();
		$('#display-2').empty();
		$('#display-1').append(text);
		$('#display-1').css('display', 'block');
		$('#display-2').css('display', 'none');
	}
}

function playUkSpeech(url) {
	var audio = new Audio(url);
	audio.play(); //播放
	$('#play-1').css('display', 'none');
	$('#play-2').css('display', 'block');
	audio.addEventListener('ended', function() {
		$('#play-1').css('display', 'block');
		$('#play-2').css('display', 'none');
	}, false);
}

function playUsSpeech(url) {
	var audio = new Audio(url);
	audio.play(); //播放
	$('#play-a').css('display', 'none');
	$('#play-b').css('display', 'block');
	audio.addEventListener('ended', function() {
		$('#play-a').css('display', 'block');
		$('#play-b').css('display', 'none');
	}, false);
}

function analysePasteOrClear() {
	var length = $("#q").val().length;
	if (length > 0) {
		$("#q").val("");
		$('#paste').css('display', 'block');
		$('#clear').css('display', 'none');
	} else {
		navigator.clipboard.readText().then(text => {
			$("#q").val(text);
			$('#paste').css('display', 'none');
			$('#clear').css('display', 'block');
		}).catch(err => {
			console.log(err);
		})
	}
}

$('#q').bind('input propertychange', function() {
	var length = $("#q").val().length;
	if (length > 0) {
		$('#paste').css('display', 'none');
		$('#clear').css('display', 'block');
	} else {
		$('#paste').css('display', 'block');
		$('#clear').css('display', 'none');
	}
	// console.log(length);
});


$(document).keypress(function(event) {
    var keynum = (event.keyCode ? event.keyCode : event.which);
	// console.log(keynum);
    if(keynum == '13'){
        getTranslateInfo();
		event.preventDefault();
    }  
}); 


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

