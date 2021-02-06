function getVocabulary(p) {
	if (typeof($.cookie('userName')) != "undefined") {
		var userName = $.cookie('userName');
		$.ajax({
			url: "/user/getVocabulary",
			type: "get",
			dataType: "json",
			data: {
				userName: userName,
				p: p
			},
			success: function(data) {
				// console.log(data);
				analysePage(data);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			},
		});
	}else{
		
	}
}
getVocabulary(1);

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

function addTd(VocabularyUUID, English, phonetic, Chinese, page) {
	var uk_voice_url = "http://dict.youdao.com/dictvoice?type=1&audio=" + encodeURIComponent(English.replace(new RegExp(/△|△ /g), ''));
	var us_voice_url = "http://dict.youdao.com/dictvoice?type=0&audio=" + encodeURIComponent(English.replace(new RegExp(/△|△ /g), ''));
	return "<td>\
				<p style=\"margin: 0;\">\
					" + English + " &nbsp; " + phonetic + " &nbsp;\
					英 <span id=\"" + VocabularyUUID + "-1\" class=\"iconfont icon-audio-high\" onclick=\"playUkSpeech('" + VocabularyUUID + "', '" + uk_voice_url + "')\"></span>\
					美 <span id=\"" + VocabularyUUID + "-a\" class=\"iconfont icon-audio-high\" onclick=\"playUsSpeech('" + VocabularyUUID + "', '" + us_voice_url + "')\"></span>\
					&nbsp; " + Chinese + "<span class=\"glyphicon glyphicon-trash trash\" onclick=\"delVocabulary('" + VocabularyUUID + "', " + page + ")\"></span>\
				</p>\
			</td>";
}

function delVocabulary(vocabularyUUID, p) {
	if (typeof($.cookie('userName')) != "undefined") {
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
	}
	setTimeout(function() {
		getVocabulary(p);
	}, 500);
}

function analyseVocabularyContent(data) {
	var phonetic = "";
	// console.log(data.indexOf("/"));
	if(data.indexOf("/") != -1) {
		data = data.replace("/ ", "/");
		var dataArray = data.split("/");
		// console.log(dataArray.length);
		for(var i = 0; i < dataArray.length; i++) {
			// console.log(i + "----------" + dataArray[i] + "--------------" + dataArray[i].indexOf(" ") + "--------" + dataArray[i].length + "-------------" + dataArray[i].charCodeAt());
			if(dataArray[i].length > 0 && (dataArray[i].indexOf(" ") == -1 || dataArray[i].indexOf(" ") > 1)) {
				phonetic = dataArray[i];
				break;
			}
		}
	}
	return phonetic;
}

function analysePage(data) {
	// console.log(data);
	// console.log(data.vocabularyDtosList);
	if(data.vocabularyDtosList.length != 0) {
		var page = data.page;
		var pageSum = data.pageSum;
		var text = "";
		$.each(data, function(v, vocabularyDtosList) {
			if(v == "vocabularyDtosList"){
				var VocabularyUUID = "";
				var English = "";
				var phonetic = "";
				var Chinese = "";
				var Trs = "";
				$.each(vocabularyDtosList, function(i, vocabularyDto) {
					VocabularyUUID = vocabularyDto.vocabularyUUID;
					English = vocabularyDto.vocabularyTitle;
					phonetic = analyseVocabularyContent(vocabularyDto.vocabularyContent);
					// console.log(phonetic);
					Chinese = vocabularyDto.vocabularyContent;
					Chinese = Chinese.replace("/" + phonetic + "/", "");
					if(phonetic != "") {
						phonetic = "/" + phonetic + "/";
					}
					if(i + 1 == vocabularyDtosList.length) {
						Trs += addTrLast(addTd(VocabularyUUID, English, phonetic, Chinese, page));
					}else{
						Trs += addTr(addTd(VocabularyUUID, English, phonetic, Chinese, page));
					}
				});
				text += addTable(Trs);
			}
		});
		$('#display').empty();
		$('#display').append(text);
		pageTurn(page, pageSum);
	}else{
		var text = "<br><br><br><br><br><h1 style=\"text-align: center;\"><strong>单词本为空！</strong></h1>";
		$('#display').empty();
		$('#display').append(text);
		$('#pageBottom').css('display', 'none');
	}
}

function addPagePrevious(p) {
	return "<li><a href=\"#\" onclick=\"getVocabulary(" + p + ")\">&lt;</a></li>";
}

function addPagePreviousDisabled() {
	return "<li class=\"disabled\"><span>&lt;</span></li>";
}

function addPageNext(p) {
	return "<li><a href=\"#\" onclick=\"getVocabulary(" + p + ")\">&gt;</a></li>";
}

function addPageNextDisabled() {
	return "<li class=\"disabled\"><span>&gt;</span></li>";
}

function addPageNum(p) {
	return "<li><a href=\"#\" onclick=\"getVocabulary(" + p + ")\">" + p + "</a></li>";
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
					text += addPageNum(cpageSum - 4);
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
	// $('#' + VocabularyUUID + '-1').css('display', 'none');
	// $('#' + VocabularyUUID + '-2').css('display', 'block');
	// audio.addEventListener('ended', function() {
	// 	$('#' + VocabularyUUID + '-1').css('display', 'block');
	// 	$('#' + VocabularyUUID + '-2').css('display', 'none');
	// }, false);
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
	// $('#' + VocabularyUUID + '-a').css('display', 'none');
	// $('#' + VocabularyUUID + '-b').css('display', 'block');
	// audio.addEventListener('ended', function() {
	// 	$('#' + VocabularyUUID + '-a').css('display', 'block');
	// 	$('#' + VocabularyUUID + '-b').css('display', 'none');
	// }, false);
}

$(window).resize(function() {
	// console.log($(document.body).outerWidth(true));
	if ($(document.body).outerWidth(true) < 768) {
		var page = document.getElementById("page");
		page.style.paddingTop = "33px";
		$('#vocabulary').attr('href', 'vocabulary.html');
		$('#user').attr('data-toggle', 'modal');
		$('#user').attr('data-target', '#loginModal');
		$('#regButton').css('display', 'block');
	} else {
		var page = document.getElementById("page");
		page.style.paddingTop = "4px";
		$('#vocabulary').attr('href', '#');
		$('#user').attr('data-toggle', 'dropdowns');
		$('#user').attr('data-target', '');
		$('#regButton').css('display', 'none');
	}

	if (typeof($.cookie('userName')) != "undefined") {
		// console.log(true);
		$("#user").text($.cookie('userName'));
		$("#user").append(" <b class=\"caret\"></b>");

		if ($(document.body).outerWidth(true) < 768) {
			$('#user').attr('href', 'notebook.html');
			$('#user').attr('data-toggle', 'dropdowns');
			$('#user').attr('data-target', '');
		} else {
			$('#user-Login').css('display', 'none');
			$('#user-Rigester').css('display', 'none');
			$('#user-Notebook').css('display', 'block');
		}
	}
});
if ($(document.body).outerWidth(true) < 768) {
	var page = document.getElementById("page");
	page.style.paddingTop = "33px";
	$('#vocabulary').attr('href', 'vocabulary.html');
	$('#user').attr('data-toggle', 'modal');
	$('#user').attr('data-target', '#loginModal');
	$('#regButton').css('display', 'block');
} else {
	var page = document.getElementById("page");
	page.style.paddingTop = "4px";
	$('#vocabulary').attr('href', '#');
	$('#user').attr('data-toggle', 'dropdowns');
	$('#user').attr('data-target', '');
	$('#regButton').css('display', 'none');
}

$(function() {
	$('.code').createCode({
		len: 4
	});
});

function addMessage(status, message) {
	return "<strong>" + status + "</strong>" + message;
}

function userRegister() {
	var userName = $('#userName').val();
	var userPassword = $('#userPassword').val();
	var accountcheckpwd = $('#checkpwd').val();
	var userAge = $('#userAge').val();
	var userSex = $("input[name='userSex']:checked").val();
	var userEmail = $('#userEmail').val();
	if (userName != "" && userPassword != "" && accountcheckpwd != "" && userAge != "" && userSex != "" && userEmail != "") {
		if (userPassword == accountcheckpwd) {
			var reg = /\w+[@]{1}\w+[.]\w+/;
			if (reg.test(userEmail)) {
				$.ajax({
					url: "/user/register",
					type: "get",
					dataType: "json",
					data: {
						userName: userName,
						userPassword: userPassword,
						userAge: userAge,
						userSex: userSex,
						userEmail: userEmail
					},
					success: function(data) {
						// console.log(data);
						if (data.message.indexOf("失败") == -1) {
							$('#myAlert3').css('display', 'block');
							$('#myAlert3').empty();
							$('#myAlert3').append(addMessage("注册成功！", "请登录！"));
							setTimeout(function() {
								$('#myAlert3').css('display', 'none');
							}, 1500);
							setTimeout(function() {
								$('#regModal').modal('hide');
							}, 2000);
							setTimeout(function() {
								$('#loginModal').modal('show');
							}, 2500);
						} else {
							$('#myAlert4').css('display', 'block');
							$('#myAlert4').empty();
							$('#myAlert4').append(addMessage("注册失败！", "用户已存在！"));
							setTimeout(function() {
								$('#myAlert4').css('display', 'none');
							}, 3000);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert(XMLHttpRequest.status);
						alert(XMLHttpRequest.readyState);
						alert(textStatus);
					},
				});
			} else {
				$('#myAlert4').css('display', 'block');
				$('#myAlert4').empty();
				$('#myAlert4').append(addMessage("错误！", "请输入正确的Email地址"));
				setTimeout(function() {
					$('#myAlert4').css('display', 'none');
				}, 3000);
			}
		} else {
			$('#myAlert4').css('display', 'block');
			$('#myAlert4').empty();
			$('#myAlert4').append(addMessage("错误！", "两次输入密码不一致！"));
			setTimeout(function() {
				$('#myAlert4').css('display', 'none');
			}, 3000);
		}
	} else {
		$('#myAlert4').css('display', 'block');
		$('#myAlert4').empty();
		$('#myAlert4').append(addMessage("警告！", "请输入注册信息！"));
		setTimeout(function() {
			$('#myAlert4').css('display', 'none');
		}, 3000);
	}
}

function userLogin() {
	var userName = $('#accountid').val();
	var userPassword = $('#accountpwd').val();
	var verificationCode1 = $('#verificationCode1').val();
	var verificationCode2 = $('#verificationCode2').val();
	if (userName != "" && userPassword != "" && verificationCode1 != "") {
		// console.log(verificationCode1.toLocaleUpperCase() + "------" + verificationCode2);
		if (verificationCode1.toLocaleUpperCase() == verificationCode2) {
			$.ajax({
				url: "/user/login",
				type: "get",
				dataType: "json",
				data: {
					userName: userName,
					userPassword: userPassword
				},
				success: function(data) {
					// console.log(data);
					if (data.message.indexOf("失败") == -1) {
						$('#myAlert1').css('display', 'block');
						$('#myAlert1').empty();
						$('#myAlert1').append(addMessage("登录成功！", ""));

						if (typeof($.cookie('userName')) != "undefined") {
							$.removeCookie('userName', {
								path: '/'
							});
						}

						var expiresDate = new Date();
						expiresDate.setTime(expiresDate.getTime() + (3 * 24 * 60 * 60 * 1000));
						$.cookie('userName', data.userName, {
							expires: expiresDate,
							path: '/'
						})

						setTimeout(function() {
							$('#myAlert1').css('display', 'none');
						}, 1500);
						setTimeout(function() {
							$("#user").text(data.userName);
							$("#user").append(" <b class=\"caret\"></b>");
							$('#loginModal').modal('hide');

							if ($(document.body).outerWidth(true) < 768) {
								$('#user').attr('href', 'notebook.html');
								$('#user').attr('data-toggle', 'dropdowns');
								$('#user').attr('data-target', '');
							} else {
								$('#user-Login').css('display', 'none');
								$('#user-Rigester').css('display', 'none');
								$('#user-Notebook').css('display', 'block');
							}
						}, 2000);
					} else {
						$('#myAlert2').css('display', 'block');
						$('#myAlert2').empty();
						$('#myAlert2').append(addMessage("登录失败！", "用户名或密码错误！"));
						setTimeout(function() {
							$('#myAlert2').css('display', 'none');
						}, 3000);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				},
			});
		} else {
			$('#myAlert2').css('display', 'block');
			$('#myAlert2').empty();
			$('#myAlert2').append(addMessage("验证码错误	！", "请重新输入验证码！"));
			setTimeout(function() {
				$('#myAlert2').css('display', 'none');
			}, 3000);
		}
	} else {
		if (userName == "" || userPassword == "") {
			$('#myAlert2').css('display', 'block');
			$('#myAlert2').empty();
			$('#myAlert2').append(addMessage("警告！", "请输入登录信息！"));
			setTimeout(function() {
				$('#myAlert2').css('display', 'none');
			}, 3000);
		} else {
			$('#myAlert2').css('display', 'block');
			$('#myAlert2').empty();
			$('#myAlert2').append(addMessage("警告！", "请输入验证码！"));
			setTimeout(function() {
				$('#myAlert2').css('display', 'none');
			}, 3000);
		}
	}
}
if (typeof($.cookie('userName')) != "undefined") {
	// console.log(true);
	$("#user").text($.cookie('userName'));
	$("#user").append(" <b class=\"caret\"></b>");
	// $('#loginModal').css('display', 'none');
	// $('#regModal').css('display', 'none');

	if ($(document.body).outerWidth(true) < 768) {
		$('#user').attr('href', 'notebook.html');
		$('#user').attr('data-toggle', 'dropdowns');
		$('#user').attr('data-target', '');
	} else {
		$('#user-Login').css('display', 'none');
		$('#user-Rigester').css('display', 'none');
		$('#user-Notebook').css('display', 'block');
	}
}
