function getPhoneticSymbol(url) {
	$.ajax({
		url: "/phoneticSymbol/" + url,
		type: "get",
		dataType: "json",
		success: function(data) {
			if (url == "getPhoneticSymbolVowel") {
				analyzeVowelPhoneticSymbol(data);
			} else {
				analyzeConsonantPhoneticSymbol(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
	})
}

function addTR(tds) {
	return "<tr>" + tds + "</tr>";
}

function addTD(audioContent, audioPath) {
	return "<td style=\"overflow: hidden;\">\
				<span style=\"font-size: 18px;font-family:'lucida sans unicode',arial,sans-serif;\">\
					<strong>" +
		audioContent + "</strong>\
				</span>\
				<br>\
				<button id=\"" + audioContent.replace(new RegExp(/\/|:/g), '') +
		"-1\" type=\"button\" class=\"btn btn-circle\" onclick=\"play('" + audioContent.replace(new RegExp(/\/|:/g), '') +
		"', '" + audioPath + "')\">\
					<span class=\"glyphicon glyphicon-play\"></span>\
				</button>\
				<button id=\"" +
		audioContent.replace(new RegExp(/\/|:/g), '') +
		"-2\" type=\"button\" class=\"btn btn-circle\" style=\"display: none;\">\
					<span class=\"glyphicon glyphicon-pause\"></span>\
				</button>\
			</td>";
}

function analyzeVowelPhoneticSymbol(data) {
	$.each(data.materialDtosList, function(i, materialDto) {
		// console.log(materialDto.materialCategory + '\n');
		var trs = "";
		$.each(materialDto, function(j, audioDtosList) {
			if (j == "audioDtosList") {
				var tds = "";
				var n = 0;
				// console.log(audioDtosList.length);
				$.each(audioDtosList, function(k, audioDto) {
					tds += addTD(audioDto.audioContent, audioDto.audioPath);
					if ((k + 1) % 4 == 0) {
						trs += addTR(tds);
						tds = "";
					}
					if (audioDtosList.length % 4 != 0) {
						n = 4 - ((k + 1) % 4);
					}
				});
				// console.log(n);
				if (n != 0) {
					for (var l = 0; l < n; l++) {
						tds += "<td></td>";
					}
				}
				trs += addTR(tds);
				tds = "";
				for (var l = 0; l < 4; l++) {
					tds += "<td></td>";
				}
				trs += addTR(tds);
			}
		});
		$("#phonetic-symbol-" + materialDto.materialCategory).append(trs);
	});
}

function analyzeConsonantPhoneticSymbol(data) {
	var trs = "";
	$.each(data.materialDtosList, function(i, materialDto) {
		// console.log(materialDto.materialCategory + '\n');
		$.each(materialDto, function(j, audioDtosList) {
			if (j == "audioDtosList") {
				var tds = "";
				$.each(audioDtosList, function(k, audioDto) {
					tds += addTD(audioDto.audioContent, audioDto.audioPath);
				});
				// console.log(audioDtosList.length);
				if (audioDtosList.length != 4) {
					for (var l = 0; l < 4 - audioDtosList.length; l++) {
						tds += "<td></td>";
					}
					trs += addTR(tds);
					tds = "";
					for (var l = 0; l < 4; l++) {
						tds += "<td></td>";
					}
					trs += addTR(tds);
					if (materialDto.materialCategory.indexOf("vivid") != -1) {
						$("#consonant-vivid").append(trs);
					} else {
						$("#consonant-turbid").append(trs);
					}
					trs = "";
				} else {
					trs += addTR(tds);
				}
			}
		});
	});
}

$(document).ready(function() {
	getPhoneticSymbol("getPhoneticSymbolVowel");
	getPhoneticSymbol("getPhoneticSymbolConsonant");
})

function play(id, path) {
	var audio = new Audio(path);
	audio.play(); //播放
	$('#' + id + '-1').css('display', 'none');
	$('#' + id + '-2').css('display', 'block');
	audio.addEventListener('ended', function() {
		$('#' + id + '-1').css('display', 'block');
		$('#' + id + '-2').css('display', 'none');
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
