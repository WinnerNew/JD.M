// 页面加载完成开始执行js代码
window.onload = function () {
    //顶部搜索栏
    search();
    // banner图自动轮播和滑动效果
    banner();
    // 活动倒计时
    downTime();
};

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
//banner
var banner = function () {
    var oBanner = document.querySelector(".jd_banner");
    var oWidth = oBanner.offsetWidth;

    var oImageBox = oBanner.querySelector("ul:first-child");
    var oIndicate = oBanner.querySelector("ul:last-child");
    console.log(oIndicate);

    var aLi = oIndicate.querySelectorAll("li");

    function addTransition() {
        oImageBox.style.transition = "all, 0.2s";
        oImageBox.style.webkitTransition = "all, 0.2s";
    }

    function removeTransition() {
        oImageBox.style.transition = "none";
        oImageBox.style.webkitTransition = "none";
    }

    function setTranslate(translateX) {
        oImageBox.style.transform = "translateX(" + translateX + "px)";
        oImageBox.style.webkitTransform = "translateX(" + translateX + "px)";
    }

    var index = 1;
    var timer = setInterval(function () {
        index++;
        addTransition();
        setTranslate(-index * oWidth);
    }, 1000);

    oImageBox.addEventListener("transitionend", function () {
        if (index >= 9) {
            index = 1;
            removeTransition();
            setTranslate(-index * oWidth);
        } else if (index <= 0) {
            index = 8;
            removeTransition();
            setTranslate(-index * oWidth);
        }

        setPoint();
    }, false);

    function setPoint() {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].classList.remove("now");
            aLi[index - 1].classList.add("now");
        }
    }

    var startX = 0;
    var disX = 0;
    var isMoved = false;

    oImageBox.addEventListener("touchstart", function (e) {
        clearInterval(timer);
        startX = e.touches[0].clientX;
    }, false);

    oImageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        disX = moveX - startX;
        var translateX = -index * oWidth + disX;
        addTransition();
        setTranslate(translateX);

        isMoved = true;
    }, false);

    oImageBox.addEventListener("touchend", function () {
        if (isMoved) {
            if (Math.abs(disX) < oWidth / 3) {
                addTransition();
                setTranslate(-index * oWidth);
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

    clearInterval(timer);
    timer = setInterval(function () {
        index++;
        addTransition();
        setTranslate(-index * oWidth);
    }, 1000);

    startX = 0;
    disX = 0;
    isMoved = false;

};

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