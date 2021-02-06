
function getPage(p) {
	$.ajax({
		url: "/material/getMaterialsList",
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

function addArticle(text) {
  return "<article class=\"kratos-hentry clearfix\">" + text + "</article>";
}

function addDivBorder(text) {
  return "<div class=\"kratos-entry-border-new clearfix\">" + text + "</div>";
}

function addImg(materialUUID, picturePath) {
  return "<div class=\"kratos-entry-thumb-new\">\
            <a href=\"articleShow.html?p=" + materialUUID + "\">\
              <img class=\"kratos-entry-thumb-new-img\" src=\"/" + picturePath.replace("\\", "/") + "\">\
            </a>\
          </div>";
}

function addDivPost(text) {
  return "<div class=\"kratos-post-inner-new\">" + text + "</div>";
}

function addHeader(materialUUID, materialCategory, materialTitle) {
  var classify = "";
  if(materialCategory.indexOf("essay") != -1) {
    classify = "精彩短文";
  }else if(materialCategory.indexOf("film") != -1) {
    classify = "动画短片";
  }else if(materialCategory.indexOf("song") != -1) {
    classify = "英文歌曲";
  }else if(materialCategory.indexOf("mv") != -1) {
    classify = "音乐视频";
  }else if(materialCategory.indexOf("grammar") != -1) {
    classify = "英语语法";
  }else if(materialCategory.indexOf("video") != -1) {
    classify = "学习视频";
  }
  
  return "<header class=\"kratos-entry-header-new\">\
            <a class=\"label-link\">" + classify + "</a>\
            <h2 class=\"kratos-entry-title-new\">\
              <a href=\"articleShow.html?p=" + materialUUID + "\">" + materialTitle + "</a>\
            </h2>\
          </header>";
}

function addP(text) {
  return "<div class=\"kratos-entry-content-new\">\
            <p>" + text + "</p>\
          </div>";
}

function addFooter(materialUUID, materialAddTime) {
  var dateTime = materialAddTime.split(" ");
  return "<footer class=\"kratos-post-meta-new\">\
            <span class=\"pull-left\">\
              <a><i class=\"fa fa-calendar\"></i></a><a>" + dateTime[0] + "</a>\
            </span>\
            <span class=\"pull-right\">\
              <a class=\"read-more\" href=\"articleShow.html?p=" + materialUUID + "\" title=\"阅读全文\">阅读全文<i class=\"fa fa-chevron-circle-right\"></i></a>\
            </span>\
          </footer>";
}

function analyseMd(md) {
  
  var result = marked(md);
  
  var oDiv = document.createElement('div');
  oDiv.innerHTML = result;
  var text = oDiv.innerText;
  // text = text.replace(/(^\s*)/g, ""); //去左空格;
  
  if(text.length > 115) {
    text = text.substring(0, 114) + "...";
  }
  
  return text;
}

function analysePage(data) {
  // console.log(data);
  
  var page = data.page;
  var pageSum = data.pageSum;
  
  var text = "";
  $.each(data.materialDtosList, function(i, materialDto) {
    var materialUUID = materialDto.materialUUID;
    var materialCategory = materialDto.materialCategory;
    var materialTitle = materialDto.materialTitle;
    var materialContent = materialDto.materialContent;
    var materialAddTime = materialDto.materialAddTime;
    
    var articleImg = "";
    var articleHead = addHeader(materialUUID, materialCategory, materialTitle);
    var articleP = addP(analyseMd(materialContent));
    var articleFooter = addFooter(materialUUID, materialAddTime);
    
    $.each(materialDto.pictureDtosList, function(j, pictureDto) {
      var picturePath = pictureDto.picturePath;
      
      articleImg = addImg(materialUUID, picturePath);
    });
    
    var articleDivPost = addDivPost(articleHead + articleP);
    text += addArticle(addDivBorder(articleImg + articleDivPost + articleFooter));
  });
  
  $('#showArticle').empty();
  $('#showArticle').append(text);
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

// const dp = new DPlayer({
//     container: document.getElementById('dplayer'),
//     video: {
//         url: 'http://file.yongkj.cn/fileSystem/admin/Resources/英语随身学/assets/Video/【剑桥词典：RP音标诞生小历史！】.mp4',
//     },
// });

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
    $('#move').css('display', 'block');
    $('#top').css('margin-bottom', '15px');
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
  $('#move').css('display', 'block');
  $('#top').css('margin-bottom', '15px');
}
