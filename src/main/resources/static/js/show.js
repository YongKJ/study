$(function() {
	$.ajax({
		url: "/alphabet/getAlphabet",
		type: "GET",
		dataType: "json",
		success: function(data) {
			//这个方法里是ajax发送请求成功之后执行的代码
			$.each(data, function(index, result) {
				var item;
				var head;
				if (index == "materialDtosList") {
					//展示26个字母图片表格
					//遍历26个展示字母图片，把它存储在img数组中
					var img = new Array();
					for (var i = 2; i < 28; i++) {
						img.push(result[0].pictureDtosList[i].picturePath);
					}
					for (var i = 0; i < 26; i++) {
						item += "<td><div><img src=" + img[i] +
							" width='80'><div class='controls'><button class='play-pause'><img id=\"play-" + i +
							"\" class='icon-btn icon-play' src='img/play.jpg' onClick=\"play('" + i + "', '" + result[0].audioDtosList[
								i].audioPath + "');\" /><img id=\"pause-" + i +
							"\" class='icon-btn icon-pause' src='img/微信图片_20201001174106.jpg' style=\"display:none;\"/></button></div></div></td>";
						if ((1 + i) % 6 == 0) {
							item = "<tr>" + item + "</tr>";
							$("#tbody-result").append(item);
							item = '';
							// console.log(item);
						}
					}
					$("#tbody-result").append("<tr>" + item + "</tr>");


					//展示书写26个字母图片表格
					item = '';
					//遍历26个书写字母图片，把它存储在img2数组中
					var img2 = new Array();
					for (var i = 28; i < 54; i++) {
						img2.push(result[0].pictureDtosList[i].picturePath);
					}
					for (var i = 0; i < 26; i++) {
						item += "<td><div><img src=" + img2[i] + " width='80' height='60'></div></td>";
						// console.log((1 + i) % 6);
						if ((1 + i) % 6 == 0) {
							item = "<tr>" + item + "</tr>";
							$("#tbody-result2").append(item);
							item = '';
							// console.log(item);
						}
					}
					$("#tbody-result2").append("<tr>" + item + "</tr>");
				}
			})
		}
	});
});

function play(n, path) {
	var audio = new Audio(path);
	audio.play(); //播放
	$('#play-' + n).css('display', 'none');
	$('#pause-' + n).css('display', 'block');
	audio.addEventListener('ended', function() {
		$('#play-' + n).css('display', 'block');
		$('#pause-' + n).css('display', 'none');
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
