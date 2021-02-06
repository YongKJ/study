$(window).resize(function() {
	// console.log($(document.body).outerWidth(true));
	if ($(document.body).outerWidth(true) < 768) {
		$('#user').attr('data-toggle', 'modal');
		$('#user').attr('data-target', '#loginModal');
		$('#regButton').css('display', 'block');
	} else {
		$('#user').attr('data-toggle', 'dropdowns');
		$('#user').attr('data-target', '');
		$('#regButton').css('display', 'none');
	}
	
	if(typeof($.cookie('userName')) != "undefined") {
		// console.log(true);
		$("#user").text($.cookie('userName'));
		$("#user").append(" <b class=\"caret\"></b>");
		
		if ($(document.body).outerWidth(true) < 768) {
			$('#user').attr('href', 'notebook.html');
			$('#user').attr('data-toggle', 'dropdowns');
			$('#user').attr('data-target', '');
			$('#sign-out-two').css('display', 'block');
		} else {
			$('#user-Login').css('display', 'none');
			$('#user-Rigester').css('display', 'none');
			$('#user-Notebook').css('display', 'block');
			$('#sign-out-one').css('display', 'block');
		}
	}
});

if ($(document.body).outerWidth(true) < 768) {
	$('#user').attr('data-toggle', 'modal');
	$('#user').attr('data-target', '#loginModal');
	$('#regButton').css('display', 'block');
} else {
	$('#user').attr('data-toggle', 'dropdowns');
	$('#user').attr('data-target', '');
	$('#regButton').css('display', 'none');
}

if(typeof($.cookie('userName')) != "undefined") {
	// console.log(true);
	$("#user").text($.cookie('userName'));
	$("#user").append(" <b class=\"caret\"></b>");
	
	if ($(document.body).outerWidth(true) < 768) {
		$('#user').attr('href', 'notebook.html');
		$('#user').attr('data-toggle', 'dropdowns');
		$('#user').attr('data-target', '');
		$('#sign-out-two').css('display', 'block');
	} else {
		$('#user-Login').css('display', 'none');
		$('#user-Rigester').css('display', 'none');
		$('#user-Notebook').css('display', 'block');
		$('#sign-out-one').css('display', 'block');
	}
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
	// var userAge = $('#userAge').val();
	// var userSex = $("input[name='userSex']:checked").val();
	// var userEmail = $('#userEmail').val();
	var userAge = 18;
	var userSex = "无";
	var userEmail = "1314520@qq.com";
	if(userName != "" && userPassword != "" && accountcheckpwd != "" && userAge != "" && userSex != "" && userEmail != "") {
		if(userPassword == accountcheckpwd) {
			var reg = /\w+[@]{1}\w+[.]\w+/;
			  if(reg.test(userEmail)) {
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
						if(data.message.indexOf("失败") == -1) {
							$('#myAlert3').css('display', 'block');
							$('#myAlert3').empty();
							$('#myAlert3').append(addMessage("注册成功！", "请登录！"));
							setTimeout(function(){
								$('#myAlert3').css('display', 'none');
							},1500);
							setTimeout(function(){
								$('#regModal').modal('hide');
							},2000);
							setTimeout(function(){
								$('#loginModal').modal('show');
							},2500);
						}else{
							$('#myAlert4').css('display', 'block');
							$('#myAlert4').empty();
							$('#myAlert4').append(addMessage("注册失败！", "用户已存在！"));
							setTimeout(function(){
								$('#myAlert4').css('display', 'none');
							},3000);
						}
					},
					error: function(XMLHttpRequest, textStatus, errorThrown) {
						alert(XMLHttpRequest.status);
						alert(XMLHttpRequest.readyState);
						alert(textStatus);
					},
				  });
			  }else{
				  $('#myAlert4').css('display', 'block');
				  $('#myAlert4').empty();
				  $('#myAlert4').append(addMessage("错误！", "请输入正确的Email地址"));
				  setTimeout(function(){
					$('#myAlert4').css('display', 'none');
				  },3000);
			  }
		}else{
			$('#myAlert4').css('display', 'block');
			$('#myAlert4').empty();
			$('#myAlert4').append(addMessage("错误！", "两次输入密码不一致！"));
			setTimeout(function(){
				$('#myAlert4').css('display', 'none');
			},3000);
		}
	}else{
		$('#myAlert4').css('display', 'block');
		$('#myAlert4').empty();
		$('#myAlert4').append(addMessage("警告！", "请输入注册信息！"));
		setTimeout(function(){
			$('#myAlert4').css('display', 'none');
		},3000);
	}
}

function userLogin() {
	var userName = $('#accountid').val();
	var userPassword = $('#accountpwd').val();
	var verificationCode1 = $('#verificationCode1').val();
	var verificationCode2 = $('#verificationCode2').val();
	if(userName != "" && userPassword != "" && verificationCode1 != "") {
		// console.log(verificationCode1.toLocaleUpperCase() + "------" + verificationCode2);
		if(verificationCode1.toLocaleUpperCase() == verificationCode2) {
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
					if(data.message.indexOf("失败") == -1) {
						$('#myAlert1').css('display', 'block');
						$('#myAlert1').empty();
						$('#myAlert1').append(addMessage("登录成功！", ""));
						
						if(typeof($.cookie('userName')) != "undefined") {
							$.removeCookie('userName',{ path: '/'});
						}
						
						var expiresDate= new Date();
						expiresDate.setTime(expiresDate.getTime() + (3 * 24 * 60 * 60 * 1000));
						$.cookie('userName', data.userName,{
						  expires: expiresDate, 
						  path:'/'
						})　
						
						setTimeout(function(){
							$('#myAlert1').css('display', 'none');
						},1500);
						setTimeout(function(){
							$("#user").text(data.userName);
							$("#user").append(" <b class=\"caret\"></b>");
							$('#loginModal').modal('hide');
							
							if ($(document.body).outerWidth(true) < 768) {
								$('#user').attr('href', 'notebook.html');
								$('#user').attr('data-toggle', 'dropdowns');
								$('#user').attr('data-target', '');
								$('#sign-out-two').css('display', 'block');
							} else {
								$('#user-Login').css('display', 'none');
								$('#user-Rigester').css('display', 'none');
								$('#user-Notebook').css('display', 'block');
								$('#sign-out-one').css('display', 'block');
							}
						},2000);
					}else{
						$('#myAlert2').css('display', 'block');
						$('#myAlert2').empty();
						$('#myAlert2').append(addMessage("登录失败！", "用户名或密码错误！"));
						setTimeout(function(){
							$('#myAlert2').css('display', 'none');
						},3000);
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					alert(XMLHttpRequest.status);
					alert(XMLHttpRequest.readyState);
					alert(textStatus);
				},
			});
		}else{
			$('#myAlert2').css('display', 'block');
			$('#myAlert2').empty();
			$('#myAlert2').append(addMessage("验证码错误	！", "请重新输入验证码！"));
			setTimeout(function(){
				$('#myAlert2').css('display', 'none');
			},3000);
		}
	}else{
		if(userName == "" || userPassword == "") {
			$('#myAlert2').css('display', 'block');
			$('#myAlert2').empty();
			$('#myAlert2').append(addMessage("警告！", "请输入登录信息！"));
			setTimeout(function(){
				$('#myAlert2').css('display', 'none');
			},3000);
		}else{
			$('#myAlert2').css('display', 'block');
			$('#myAlert2').empty();
			$('#myAlert2').append(addMessage("警告！", "请输入验证码！"));
			setTimeout(function(){
				$('#myAlert2').css('display', 'none');
			},3000);
		}
	}
}

function signOut() {
	if(typeof($.cookie('userName')) != "undefined") {
		$.removeCookie('userName',{ path: '/'});
		window.location.reload();
	}
}
