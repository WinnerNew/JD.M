// 页面加载完成开始执行js代码
window.onload = function () {
    //顶部搜索栏
    search();
    // banner图自动轮播和滑动效果
    banner();
    // 活动倒计时
    downTime();
};

//顶部搜索栏
var search = function () {
    var oSearchBox = document.querySelector(".search_box");
    var oBanner = document.querySelector(".jd_banner");
    var bannerHeight = oBanner.offsetHeight;

    window.onscroll = function () {
        var oScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var opacity = 0;
        if (oScrollTop <= bannerHeight) {
            opacity = 0.85 * (oScrollTop / bannerHeight);
        } else {
            opacity = 0.85;
        }
        oSearchBox.style.background = "rgba(216,80,92," + opacity + ")";
    }
};

//banner轮播图
var banner = function () {
    var oBanner = document.querySelector(".jd_banner");
    //获取偏移宽度
    var oWidth = oBanner.offsetWidth;
    //获取轮播图ul
    var oImageBox = oBanner.querySelector("ul:first-child");
    //获取轮播点
    var oIndicate = oBanner.querySelector("ul:last-child");
    // console.log(oIndicate);
    //获取单个轮播图
    var aLi = oIndicate.querySelectorAll("li");
    //设置轮播动画切换时间
    function addTransition() {
        oImageBox.style.transition = "all, 0.2s";
        oImageBox.style.webkitTransition = "all, 0.2s";
    }
    //移除轮播动画
    function removeTransition() {
        oImageBox.style.transition = "none";
        oImageBox.style.webkitTransition = "none";
    }
    //设置动画移动坐标
    function setTranslate(translateX) {
        oImageBox.style.transform = "translateX(" + translateX + "px)";
        oImageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }
    //给轮播图中的li设置index索引
    var index = 1;
    //间隔动画
    var timer = setInterval(function () {
        //每次移动=>index+1
        index++;
        // 动画函数执行一次
        addTransition();
        //设置ul横幅水平移动多少px
        setTranslate(-index * oWidth);
        //间隔1s执行一次动画
    }, 1000);
    //css过度结束后执行
    oImageBox.addEventListener("transitionend", function () {
        //当动画执行到第九张轮播图,ul横幅清零回到第一张li
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslate(-index * oWidth);
            //反方向将ul轮播图定位到第八张
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslate(-index * oWidth);
        }
        //轮播点样式定位到对应index的位置
        setPoint();
    }, false);
    //设置轮播点的css活动样式
    function setPoint() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].classList.remove("now");
            aLi[index - 1].classList.add("now");
        }
    }
    var startX = 0;
    var disX = 0;
    var isMoved = false;
    //轮播图ul添加touchstart事件
    oImageBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    }, false);
    //设置轮播图跟随指尖移动距离做出水平移动
    oImageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        disX = moveX - startX;
        var translateX = -index * oWidth + disX;
        addTransition();
        setTranslate(translateX);
        isMoved = true;
    }, false);
    //当指尖抬起,轮播图定位到触碰后的位置
    oImageBox.addEventListener("touchend", function () {
        if (isMoved) {
            // 指尖移动不到轮播图的1/3则判定为:
            //无效的触碰滑动事件轮播图回到当前位置不做水平移动
            if (Math.abs(disX) < oWidth / 3) {
                addTransition();
                setTranslate(-index * oWidth);
            //有效触碰滑动事件轮播图对应切换
            } else {
                if (disX > 0) {
                    index--;
                } else {
                    index++
                }
                addTransition();
                setTranslate(-index * oWidth);
            }
        }
        timer = setInterval(function () {
            index++;
            addTransition();
            setTranslate(-index * oWidth);
        }, 1000);
    }, false);
    //清除动画函数
    clearInterval(timer);
    //启动动画
    timer = setInterval(function () {
        index++;
        addTransition();
        setTranslate(-index * oWidth);
    }, 1000);
    //清零
    startX = 0;
    disX = 0;
    isMoved = false;
};

//活动倒计时
var downTime = function () {
    var oTime = document.querySelector(".sk_time");
    var aSpan = oTime.querySelectorAll("span");
    var time = 1 * 60 * 60;
    timerCount();
    var timer = setInterval(timerCount, 1000);

    function timerCount() {
        time--;
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        aSpan[0].innerText = Math.floor(h / 10);
        aSpan[1].innerText = h % 10;
        aSpan[3].innerText = Math.floor(m / 10);
        aSpan[4].innerText = m % 10;
        aSpan[6].innerText = Math.floor(s / 10);
        aSpan[7].innerText = s % 10;

        // console.log(time);
        if (time <= 0) {
            clearInterval(timer);
        }
    }

};