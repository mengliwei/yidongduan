/*音乐*/
~function () {
    var music = document.getElementById("music"), audioFir = document.getElementById("audioFir");

    //->给页面的加载缓冲500MS时间
    window.setTimeout(function () {
        audioFir.play();

        //->当音频文件可以播放(出声了)的时候:canplay/canplaythrough
        audioFir.addEventListener("canplay", function () {
            music.style.display = "block";
            music.className = "music musicMove";
        }, false);
    }, 500);

    //->移动端使用CLICK存在300MS的延迟
    music.addEventListener("click", function () {
        //->当前是暂停的
        if (audioFir.paused) {
            audioFir.play();
            music.className = "music musicMove";
            return;
        }
        //->当前是播放的
        audioFir.pause();
        music.className = "music";
    }, false);
}();



var main = document.querySelector("#main");
var oLis = document.querySelectorAll("#main>section");
var winW = document.documentElement.clientWidth;
/*设备的宽*/
var winH = document.documentElement.clientHeight;
/*设备的高*/
var desW = 640;
/*设计稿的宽*/
var desH = 1008;
/*设计稿的高*/
if (winW / winH <= desW / desH) {
    main.style.webkitTransform = "scale(" + winH / desH + ")";
} else {
    main.style.webkitTransform = "scale(" + winW / desW + ")";
}

[].forEach.call(oLis, function () {
    var oLi = arguments[0];
    oLi.index = arguments[1];
    oLi.addEventListener("touchstart", start, false);
    oLi.addEventListener("touchmove", move, false);
    oLi.addEventListener("touchend", end, false);
});
//1.记录按下时坐标,移动时坐标,得出移动的距离,根据移动的距离判断出滑动的方向
//2.获得上一个或者下一个的坐标,并且做过界判断
//3.处理上下滑动的距离
function start(e) {
    this.startX = e.changedTouches[0].pageX;
}
function move(e) {
    this.flag = true;//如果是点击不是滑动,不会触发touchmove事件
    e.preventDefault();
    var moveX = e.changedTouches[0].pageX;
    var movePos = moveX - this.startX;
    var index = this.index;
    [].forEach.call(oLis,function(){
        if(arguments[1]!=index){//除了自已,所有的li都隐藏
            arguments[0].style.display = "none";
        }
        arguments[0].className = "";//把所有li的类名清空
        //arguments[0].firstElementChild.id = "";//滑动时把li下的第一个子元素的id名清空
    })//除了自己其他的li全部隐藏
    if (movePos > 0) {/*下滑*/
        this.prevsIndex = index == 0 ? oLis.length - 1 : index - 1;
        var duration = -winW + movePos;//winH是自己随便设置的,可以写480都行
    } else if (movePos < 0) {/*上滑*/
        this.prevsIndex = index == oLis.length - 1 ? 0 : index +1;
        var duration =winW + movePos;
    }
    oLis[this.prevsIndex].style.display  ="block";
    oLis[this.prevsIndex].className = "zIndex";
    oLis[this.prevsIndex].style.webkitTransform = "translate(" + duration + "px,0)";
    //处理当前这一张
    //缩放的倍数 = 1- 移动的距离/设备的高度
    //oLis[index].style.webkitTransform = "scale("+(1-Math.abs(movePos)/winW*1/2)+") translate(0,"+movePos+"px)";

}
function end(e) {
    if(this.flag){
        //回到原始点的位置
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
        oLis[this.prevsIndex].style.webkitTransition = "0.7s";
        oLis[this.prevsIndex].addEventListener("webkitTransitionEnd",function(){
            this.style.webkitTransition = "";//相当于清除动画的积累
            //this.firstElementChild.id = "a"+this.index;
        });
        this.flag = false;
    }

}








