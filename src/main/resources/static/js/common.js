var bannerStar = function($dom, num) {
    if (!$dom || $dom.length == 0) return;
    if (!num) num = 500;

    $dom.css('position', 'relative');
    $("<div class='banner-dot-star' style='position:absolute;width:100%;height:100%;left:0;top:0;overflow:hidden;'></div>").prependTo($dom);
    var el = $dom.find('.banner-dot-star').get(0);
    var e = {};
    e.width = $dom.width(),
    e.height = $dom.height(),
    e.meteorColor = [
        [185, 164, 255],
        [83, 236, 184]
    ];

    function arrayRandom(e) {
        return e[Math.floor(Math.random() * e.length)]
    }
    function rgb(e) {
        return "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")"
    }
    function rgba(e, t) {
        return "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + t + ")"
    }
    function numInterpolate(e, t, n) {
        return e * (1 - n) + t * n
    }
    function numReverseInterpolate(e, t, n) {
        return (n - e) / (t - e)
    }
    function px(e) {
        return e + "px"
    }
    while (num--) {
        var m = 10 + Math.random() * (e.width - 20),
            g = 10 + Math.random() * (e.height - 20),
            y = 1 - Math.abs(m - e.width / 2) / e.width * 2,
            b = 1 - Math.abs(g - e.height / 2) / e.height * 2,
            w = Math.pow(y * b, 2);
        if (m > 500 && m < 700 && g > 100 && g < 200 || Math.random() > 0.1) {
            continue;
        }
        var o = numReverseInterpolate(0, e.width, m),
            E = rgb([
                    Math.round(numInterpolate(e.meteorColor[0][0], e.meteorColor[1][0], o)),
                    Math.round(numInterpolate(e.meteorColor[0][1], e.meteorColor[1][1], o)),
                    Math.round(numInterpolate(e.meteorColor[0][2], e.meteorColor[1][2], o))
            ]);
        E = 'rgba(255,255,255,' + o + ')';
        var $node = $("<div class='dot'></div>");
        var width = px(Math.floor(Math.random() * 5 + 4));
        $node.css({
            'position': 'absolute',
            'position': 'absolute',
            'left': px(m),
            'top': px(g),
            'width': width,
            'height': width,
            'border-radius': '50%',
            'opacity': Math.random() * .25 + .5,
            'background-color': E,
            'animation': 'dot3 4.0s infinite ease-in-out',
            'animation-name': arrayRandom(["dot1", "dot2", "dot3", "dot4"]),
            'animation-duration': numInterpolate(3000, 20000, Math.random()) + "ms",
            'animation-delay': numInterpolate(0, 1e3, Math.random()) + "ms",
        });
        el.insertBefore($node.get(0), el.childNodes[0]);
    }
}


function bannerLine(options) {
    //移动端
    var u = navigator.userAgent, app = navigator.appVersion;
    if(!!u.match(/AppleWebKit.*Mobile.*/)){
        return;
    }
    if( navigator.appName == "Microsoft Internet Explorer" && 
        parseInt(app.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<=9){
        return;
    }
    if( options instanceof jQuery ){
        options = {parent:options};
    }
    if(options.parent instanceof jQuery){
        var $dom = $(options.parent);
        $.each($dom,function(){
            options.parent = $(this);            
            bannerLineStart( options );
        });
    }else{
        bannerLineStart( options );
    }
}

function bannerLineStart(options) {
    var defaultOption = {
        parent: $("body"),
        className: "animateLineBox",
        css: {},
        color: [255, 255, 255],
        line: 10
    }
    options = $.extend({}, defaultOption, options);
    var $canvas = $('<canvas class="' + options.className + '" ></canvas>').prependTo(options.parent);
    options.parent.css({
        'position': 'relative'
    });
    $canvas.css({
        'position': 'absolute',
        'padding': '0px',
        'top': 0,
        'pointer-events': 'none'
    });
    var canvasHeight = options.parent.outerHeight() + 'px';
    var canvasWidth = (options.parent.outerWidth() < 1536 ? 1536 : options.parent.outerWidth()) + 'px';
	// console.log(canvasWidth);
    $canvas.css({
        'width': canvasWidth,
        'height': canvasHeight,
    }).css(options.css);

    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;
    var $color = options.color;
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        canvas = $canvas.get(0);
        width = $($canvas).width();
        height = $($canvas).height();
        target = {
            x: width / 2,
            y: height / 2
        };
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // create points
        points = [];
        var pointLine = options.line;
        for (var x = 0; x < width; x = x + width / pointLine) {
            for (var y = 0; y < height; y = y + height / pointLine) {
                var px = x + Math.random() * width / pointLine;
                var py = y + Math.random() * height / pointLine;
                var p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };
                points.push(p);
            }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
        // assign a circle to each point
        for (var i in points) {
            var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(' + $color[0] + ',' + $color[1] + ',' + $color[2] + ',0.2)');
            points[i].circle = c;
        }
    }
    // Event handling

    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        //window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX - (document.body.scrollLeft + document.documentElement.scrollLeft);
            posy = e.pageY - (document.body.scrollTop + document.documentElement.scrollTop);
            posy = e.pageY - $canvas.offset().top;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX;
            posy = e.clientY;
        }
        target.x = posx;
        target.y = posy;
    }
    function scrollCheck() {
        if ($(document).scrollTop() > height / 2) animateHeader = true;
        else animateHeader = false;
    }
    function resize() {
        width = ($canvas).parent().outerWidth();
        height = ($canvas).parent().outerHeight();
    }
    // animation
    function initAnimation() {
        animate();
        for (var i in points) {
            shiftPoint(points[i]);
        }
    }
    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in points) {
                // detect points in range
                if (Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if (Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    // points[i].circle.active = 0;
                    if(typeof points[i].circle != 'undefined'){
                        points[i].circle.active = 0;
                    }
                }

                drawLines(points[i]);
                if(typeof points[i].circle != 'undefined'){
                    points[i].circle.draw();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: Circ.easeInOut,
            onComplete: function() {
                shiftPoint(p);
            }
        });
    }
    // Canvas manipulation

    function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(' + $color[0] + ',' + $color[1] + ',' + $color[2] + ',' + p.active + ')';
            ctx.stroke();
        }
    }

    function Circle(pos, rad, color) {
        var _this = this;
        // constructor
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if (!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(' + $color[0] + ',' + $color[1] + ',' + $color[2] + ',' + _this.active + ')';
            ctx.fill();
        };
    }
    // Util
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    return $canvas;
}


$(document).ready(function() {
    bannerStar($('.exp-banner'));
    bannerLine($('.office-opt.blue'));
    bannerLine({
        parent: $(".header"),
        color: [255, 255, 255],
        css: {
            top: '80px',
            opacity: 0.8
        },
        line: 12
    });
    bannerLine({
        parent: $(".exp-banner"),
        //css:{opacity:0.5},
        color: [255, 255, 255],
    });
    
    
    $(".frdlink").hover(function(){
        $(this).addClass("show-all");
    },function(){
        $(this).removeClass("show-all");
    });
    $(".show-more-article").hover(function(){
        $('.article-more:hidden').fadeIn(100);
    },function(){});
    $(".article-more").hover(function(){
        $('.article-more:hidden').fadeIn(100);
    },function(){
        $('.article-more').fadeOut(100);
    });
    
    // 右下角客服信息
    kefuInit();
});

var topIcon = null;
function kefuInit(){
    var kefuBox = $(".kefu-box .container-fluid");
    if(getClientInfo()){
        mbEvent(kefuBox);return false;
    }
    
    kefuBox.children('div').hover(function(){},function(){
        $(".kf-box").hide();
    });
    
    // QQ客服
    kefuBox.find(".item:eq(0)").hover(function(e){
        $(".kf-box").show();
        // e.stopImmediatePropagation();
    });
    $(".kf-box").hover(function(){},function(){
        $(this).hide();
    });
    // $("body").click(function(){
    $("body").on("click", ":not(.kf-box)", function(e){
        if(!notEle(e)){
            return false;
        }
        $(".kf-box").hide();
    });

    // 电话客服
    kefuBox.find(".item:eq(1)").hover(function(){
        $(".kf-box").hide();
        $(this).addClass('telitem');
        $(this).width(168);
    },function(){
        $(this).removeClass('telitem');
        $(this).width(50);
    });
    
    
    // 返回顶部
    if($(window).scrollTop() < 50){
        kefuBox.find(".item:eq(2)").hide();
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 50) {
            kefuBox.find(".item:eq(2)").show();
        } else {
            kefuBox.find(".item:eq(2)").hide();
        }
    });

    kefuBox.find(".item:eq(2)").hover(function(){
        $(".kf-box").hide();
        if(topIcon == null){
            topIcon = $(this).html();
        }
        $(this).html('<a href="#top" class="backTop">返回<br>顶部</a>')
    },function(){
        $(this).html(topIcon);
    });
    // qq点击事件
    $(".kf-box .kf-info a").click(function(){window.open($(this).attr('href'))});
}

// 移动端事件
function mbEvent(kefuBox){
    // QQ客服
    kefuBox.find(".item:eq(0)").click(function(e){
        itemStyle(kefuBox, $(this));
        $(".kf-box").show();
        telEvent(kefuBox.find(".item:eq(1)"));
        e.stopImmediatePropagation();
        
    });
    $(document).on("click",":not(.kf-box)",function(e){
        kefuBox.find(".item").css('background', 'rgba(0,0,0,0.20)');
        if(!notEle(e)){
            return false;
        }
        $(".kf-box").hide();
        telEvent(kefuBox.find(".item:eq(1)"));
        e.stopImmediatePropagation();
    });
    $(document).on('touchmove',":not(.kf-box)",function(e){
        kefuBox.find(".item").css("background", "rgba(0,0,0,0.20)");
        $(".kf-box").hide();
        telEvent(kefuBox.find(".item:eq(1)"));
        e.stopImmediatePropagation();
    });

    // 电话客服
    kefuBox.find(".item:eq(1)").click(function(e){
        var _this = $(this);
        itemStyle(kefuBox, _this);
        $(".kf-box").hide();
        _this.addClass('telitem');
        _this.width(168);
        setTimeout(function(){
            _this.find('a').attr('href', 'tel:' + _this.find('.tel-number').text());
        },500);
        e.stopImmediatePropagation();
    });

    kefuBox.find(".item:eq(2)").click(function(){
        $(this).css('background', '#108EE9');
    });
    
    // 返回顶部
    if($(window).scrollTop() < 50){
        kefuBox.find(".item:eq(2)").hide();
    }
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 50) {
            kefuBox.find(".item:eq(2)").fadeIn();
        } else {
            kefuBox.find(".item:eq(2)").fadeOut();
        }
    });
}

function notEle(e){
    var e = e || window.event; //浏览器兼容性 
	var elem = e.target || e.srcElement;
	while (elem) { //循环判断至跟节点，防止点击的是div子元素 
		if (elem.className && elem.className == 'kf-box') {
			return false;
		}
		elem = elem.parentNode;
	}
	return true;
}

function itemStyle(kefuBox, _this){
    kefuBox.find(".item").css("background", "rgba(0,0,0,0.20)");
    _this.css('background', '#108EE9');
}

function telEvent(telItem){
    telItem.removeClass('telitem');
    telItem.width(50);
    telItem.find('a').attr('href', 'javascript:void(0)');
}

function getClientInfo(){  
    var userAgentInfo = navigator.userAgent;  
    var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
    var agentinfo = null;  
    for (var i = 0; i < Agents.length; i++) {  
       if (userAgentInfo.indexOf(Agents[i]) > 0) { agentinfo = userAgentInfo; break; }  
    }  
    return agentinfo ? true : false;    
}


$(document).bind('ready',function(){
	var $main = $(".wrap-row-download");
	if($main.length == 0) return;
	$.ajax({
		url:"https://api.kodcloud.com/?app/version",
		dataType:'jsonp',
		success:function(result){
			//console.log(result);
			if(!result || !result.data){
				return $main.html('数据异常!');
			}
			var data = result.data;
			var platform = 'ios,android,win,mac,server'.split(',');
			for (var i = 0; i < platform.length; i++) {
				var app = platform[i];
				var item  = data[app];
				var title = '更新于:'+item.time+' \n版本:'+item.version+' \n大小:'+item.size;
				var $btn  = $main.find(".data-"+app);
				var desc  = 'v'+item.version+'/'+item.size;
				
				if(app=='win' || app == 'mac' || app=='server'){
					$btn.find("em").html(desc);
				}
				
				$btn.attr('href',item.link);
				$btn.attr('title',title);
			}
	
			$main.find(".data-update").attr('href',data.server.linkUpdate);
			$main.find(".data-server-link").html(data.server.link);
			var arr = data.server.link.split('/');//文件名;
			$main.find(".data-server-name").html(arr[arr.length-1]);
		}
	});
});