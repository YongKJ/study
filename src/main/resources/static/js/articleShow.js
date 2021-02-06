
function getArticle(materialUUID) {
	$.ajax({
		url: "/material/getArticle",
		type: "get",
		dataType: "json",
		data: {
			materialUUID: materialUUID
		},
		success: function(data) {
			analyseArticle(data);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		},
	});
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

var materialUUID = getQueryVariable("p");
if(materialUUID) {
  getArticle(materialUUID);
}else {
  $('#articleShow').css('display', 'none');
  $('#display').css('display', 'block');
}

function addDivPost(text) {
  return "<div class=\"kratos-hentry kratos-post-inner clearfix\">" + text + "</div>";
}

function addHeader(materialTitle, materialCategory, materialAddTime, materialContent) {
  var dateTime = materialAddTime.split(" ");
  
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
  
  var result = marked(materialContent);
  var oDiv = document.createElement('div');
  oDiv.innerHTML = result;
  var mdText = oDiv.innerText;
  
  return "<header class=\"kratos-entry-header\">\
            <h1 class=\"kratos-entry-title text-center\">" + materialTitle + "</h1>\
            <div class=\"kratos-post-meta text-center\">\
              <span>\
                <i class=\"fa fa-calendar\"></i> " + dateTime[0] + "\
                <i class=\"fa fa-folder\"></i> 分类于\
                <a class=\"label-link\">\
                  " + classify + "\
                </a>\
                <i class=\"fa fa-user\"></i> 作者 admin\
                <i class=\"fa fa-edit\"></i> " + mdText.length + " 字\
              </span>\
            </div>\
          </header>";
}

function addDivContent() {
  // var result = marked(materialContent, {breaks: true});
  
  // return "<div class=\"kratos-post-content\">\
  //           <hr>\
  //           " + result + "\
  //         </div>";
  
  return "<div class=\"kratos-post-content\">\
            <hr>\
            <div id=\"app\">\
              <div v-html=\"content\" class=\"markdown-body\"></div>\
            </div>\
          </div>";
}

function addDivCopyright() {
  return "<div class=\"kratos-copyright text-center clearfix\">\
            <h5>本作品采用\
              <a rel=\"license nofollow\" target=\"_blank\" href=\"http://creativecommons.org/licenses/by-sa/4.0/\">\
                知识共享署名-相同方式共享 4.0 国际许可协议\
              </a>\
              进行许可\
            </h5>\
          </div>";
}

function addFooter(materialAddTime, materialTitle, materialContent) {
  var dateTime = materialAddTime.split(" ");
  var url = window.location.href;
  
  var result = marked(materialContent);
  var oDiv = document.createElement('div');
  oDiv.innerHTML = result;
  var mdText = oDiv.innerText;
  // text = text.replace(/(^\s*)/g, ""); //去左空格;
  if(mdText.length > 115) {
    mdText = mdText.substring(0, 115) + "...";
  }
  mdText = mdText.replace(/\n|\r/g,"") //去掉换行
  
  return "<footer class=\"kratos-entry-footer clearfix\">\
            <div class=\"post-like-donate text-center clearfix\" id=\"post-like-donate\">\
              <a class=\"share\" href=\"javascript:;\"><i class=\"fa fa-share-alt\"></i> 分享</a>\
              <div class=\"share-wrap\" style=\"display: none;\">\
                <div class=\"share-group\">\
                  <a href=\"javascript:;\" class=\"share-plain qq\" onclick=\"share('qq', '" + url + "', '" + materialTitle + "', '" + mdText + "');\" rel=\"nofollow\">\
                    <div class=\"icon-wrap\">\
                      <i class=\"fa fa-qq\"></i>\
                    </div>\
                  </a>\
                  <a href=\"javascript:;\" class=\"share-plain qzone\" onclick=\"share('qzone', '" + url + "', '" + materialTitle + "', '" + mdText + "');\" rel=\"nofollow\">\
                    <div class=\"icon-wrap\">\
                      <i class=\"fa fa-star\"></i>\
                    </div>\
                  </a>\
                  <a href=\"javascript:;\" class=\"share-plain weixin pop style-plain\" rel=\"nofollow\">\
                    <div class=\"icon-wrap\">\
                      <i class=\"fa fa-weixin\"></i>\
                    </div>\
                    <div class=\"share-int\">\
                      <div class=\"qrcode\" id=\"wechat-qr\" title=\"https://blog.yongkj.cn/2020/11/23/subway/\">\
                        <canvas id=\"myQrCode\" width=\"150\" height=\"150\" style=\"display: none;\"></canvas>\
                      </div>\
                      <p>打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮</p>\
                    </div>\
                  </a>\
                  <a href=\"javascript:;\" class=\"share-plain weibo\" onclick=\"share('weibo', '" + url + "', '" + materialTitle + "', '" + mdText + "');\" rel=\"nofollow\">\
                    <div class=\"icon-wrap\">\
                      <i class=\"fa fa-weibo\"></i>\
                    </div>\
                  </a>\
                  <a href=\"javascript:;\" class=\"share-plain facebook style-plain\" onclick=\"share('facebook', '" + url + "', '" + materialTitle + "', '" + mdText + "');\" rel=\"nofollow\">\
                    <div class=\"icon-wrap\">\
                      <i class=\"fa fa-facebook\"></i>\
                    </div>\
                  </a>\
                  <a href=\"javascript:;\" class=\"share-plain twitter style-plain\" onclick=\"share('twitter', '" + url + "', '" + materialTitle + "', '" + mdText + "');\" rel=\"nofollow\">\
                    <div class=\"icon-wrap\">\
                      <i class=\"fa fa-twitter\"></i>\
                    </div>\
                  </a>\
                </div>\
              </div>\
            </div>\
            <div class=\"footer-tag clearfix\">\
              <div class=\"pull-left\">\
                <i class=\"fa fa-tags\"></i>\
                <a class=\"tag-none-link\" rel=\"tag\">study</a>,\
                <a class=\"tag-none-link\" rel=\"tag\">effort</a>,\
                <a class=\"tag-none-link\" rel=\"tag\">passion</a>,\
                <a class=\"tag-none-link\" rel=\"tag\">struggle</a>\
              </div>\
              <div class=\"pull-date\">\
                <span>最后编辑：" + dateTime[0] + "</span>\
              </div>\
            </div>\
          </footer>";
}

function addPreOrNextArticle(preMaterialUUID, preMaterialTitle, nextMaterialUUID, nextMaterialTitle) {
  var preArticle = "";
  if(preMaterialUUID != "") {
    preArticle = "<div class=\"nav-previous clearfix\">\
                    <a title=\" " + preMaterialTitle + "\" href=\"/articleShow.html?p=" + preMaterialUUID + "\">\
                      &lt;上一篇\
                    </a>\
                  </div>";
  }
  
  var nextArticle = "";
  if(nextMaterialUUID != "") {
    nextArticle = "<div class=\"nav-next clearfix\">\
                     <a title=\" " + nextMaterialTitle + "\" href=\"/articleShow.html?p=" + nextMaterialUUID + "\">\
                       下一篇&gt;\
                     </a>\
                   </div>";
  }
  
  return "<nav class=\"navigation post-navigation clearfix\" role=\"navigation\">\
            " + preArticle + "\
            " + nextArticle + "\
          </nav>";
}

function analyseArticle(data) {
  // console.log(data);
  
  var materialTitle = data.materialDto.materialTitle;
  var materialContent = data.materialDto.materialContent;
  var materialCategory = data.materialDto.materialCategory;
  var materialAddTime = data.materialDto.materialAddTime;
  
  var preMaterialUUID = data.preMaterialUUID;
  var preMaterialTitle = data.preMaterialTitle;
  var nextMaterialUUID = data.nextMaterialUUID;
  var nextMaterialTitle = data.nextMaterialTitle;
  
  var articleHeader = addHeader(materialTitle, materialCategory, materialAddTime, materialContent);
  var articleContent = addDivContent();
  var articleFooter = addFooter(materialAddTime, materialTitle, materialContent);
  
  var preOrNextArticle = addPreOrNextArticle(preMaterialUUID, preMaterialTitle, nextMaterialUUID, nextMaterialTitle);
  
  var text = addDivPost(articleHeader + articleContent + addDivCopyright() + articleFooter) + preOrNextArticle;

  $('#articleDisplay').empty();
  $('#articleDisplay').append(text);
  
  renderMdData(materialContent);
  
  $('title').text(materialTitle);
  
  createQRCode(window.location.href);
}

function renderMdData(materialContent) {
  new Vue({
    el: '#app',
    data: function() {
      return {
        content: ''
      }
    },
    mounted: function() {
      this.getMdHtmlData();
    },
    methods: {
      getMdHtmlData: function() {
        let markdownIt = window.MavonEditor.markdownIt;
        var result = markdownIt.render(materialContent);
        this.content = result;
        // console.log(result);
      }
    }
  });
}

function createQRCode(text) {
  new QRCode("wechat-qr", {
    text: text,
    width: 150,
    height: 150,
    correctLevel: QRCode.CorrectLevel.H
  });
}

function share(dest, hostUrl, title, excerpt) {
  const qqBase = "https://connect.qq.com/widget/shareqq/index.html?";
  const weiboBase = "https://service.weibo.com/share/share.php?";
  const qzoneBase = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
  const facebookBase = "https://www.facebook.com/sharer/sharer.php?";
  const twitterBase = "https://twitter.com/intent/tweet?";
  title = "「" + title + "」";
  // const hostUrl = "https://blog.yongkj.cn/2020/11/23/subway/";
  // const title = "「Subway」";
  // const excerpt = `&emsp;&emsp;In recent years, more and more cities in China have begun to build subways. The development of subways ...`;
  let _URL;
  switch (dest) {
    case "qq":
      _URL = qqBase + "url=" + hostUrl + "&title=" + title + "&desc=&summary=" +
        excerpt + "&site=cxpy";
      break;
    case "weibo":
      _URL = weiboBase + "url=" + hostUrl + "&title=" + title + excerpt;
      break;
    case "qzone":
      _URL = qzoneBase + "url=" + hostUrl + "&title=" + title + "&desc=&summary=" +
        excerpt + "&site=cxpy";
      break;
    case "facebook":
      _URL = facebookBase + "u=" + hostUrl;
      break;
    case "twitter":
      _URL = twitterBase + "text=" + title + excerpt + "&url=" + hostUrl;
      break;
  }
  window.open(_URL);
};

const dp = new DPlayer({
  container: document.getElementById('dplayer'),
  video: {
    url: 'http://file.yongkj.cn/fileSystem/admin/Resources/英语随身学/assets/Video/【剑桥词典：RP音标诞生小历史！】.mp4',
  },
});

$(window).resize(function() {
  // console.log($(document.body).outerWidth(true));
  if ($(document.body).outerWidth(true) < 768) {
    $('#vocabulary').attr('href', 'vocabulary.html');
    $(document).on("click", ".share", () => {
      $(".share-wrap").fadeToggle("slow")
    })
  } else {
    $('#vocabulary').attr('href', '#');
    $('#move').css('display', 'block');
  }
});

if ($(document.body).outerWidth(true) < 768) {
  $('#vocabulary').attr('href', 'vocabulary.html');
  $(document).on("click", ".share", () => {
    $(".share-wrap").fadeToggle("slow")
  })
} else {
  $('#vocabulary').attr('href', '#');
  $('#move').css('display', 'block');
}
