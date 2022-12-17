$(function () {
    // 通栏广告
    function handlerHide() {
        $(".top-suning-img")
            .css({
                display: "none"
            })
        $(".top-suning-btn1")
            .css({
                display: "none"
            })
        $(".top-suning-btn2")
            .css({
                display: "block"
            })
    }
    function handlerSwitch() {
        $(".top-suning-img")
            .css({
                display: "block"
            })
        $(".top-suning-btn2")
            .css({
                display: "none"
            })
        $(".top-suning-btn1")
            .css({
                display: "block"
            })
    }

    $(".top-suning-ad .top-suning-btn1").on("click", handlerHide);
    $(".top-suning-ad .top-suning-btn2").on("click", handlerSwitch);
})

// 模糊搜索
let search_list = document.querySelector(".search_list");
let search = document.querySelector(".top-search");
// jsonp 事件驱动 : 
// 我们页面上只要有带有src的script标签，那么我们的浏览器就会发起请求; 
// - 我们可以不可以创建一个script标签放入页面之中实现请求的发起那 ? 
// - 可以! 
search.addEventListener("input", () => {
    // 在这里主要是为了发起请求接收到来自于百度的数据! 
    // 根据百度的数据渲染页面; 
    // 发送请求的主要机制就是创建script标签给script标签添加好src路径，然后放入页面之中，请求就发起了; 
    let script = document.createElement("script");
    // 给script赋值请求路径; 
    script.src = `https://www.baidu.com/sugrec?prod=pc&from=pc_web&wd=${search.value}&cb=jsonpCallback`;
    // 我们把标签放入到body之中; 
    document.body.appendChild(script);
    // 机制 : 只要把script标签放入到页面之中，那么浏览器就已经发起请求了， 所以此时script标签已经没用了! 我们直接删除掉这个标签就可以了! 
    script.remove();
    search_list.style.display = "block"
})

window.jsonpCallback = function (data) {
    // data就是响应数据，我们通过data进行接收; 
    let { g } = data;
    // 因为不是所有的关键词都有模糊搜索提示，所以我们要给g一个默认值; 
    g = g || [];
    // 使用返回数据里面的数组去渲染页面; 
    search_list.innerHTML = g.map(item => `<li>${item.q}</li>`).join("")
    search_list.addEventListener("click", handlerSearchList)
}
function handlerSearchList(e) {
    e = e || window.event;
    search.value = e.target.innerText
    search_list.style.display = "none"
}

// 导航栏
$(function () {
    // 功能部分
    // 处理顶部的显示隐藏功能
    function suningNavLeftHover() {
        // 1.给当前触发事件元素添加类名
        // 2.让当前元素的子级元素 .top-menu 显示

        // 如果我们要操作元素的dom对象先要转换成jQuery实例对象,那么我们需要 $(dom对象) 再去操作才可以使用jQuery的api 
        //  console.log($(this));
        $(this)
            .addClass("active")
            .find(".top-menu")
            .css({
                display: "block"
            })
    }
    function suningNavLeftOver() {
        $(this)
            .removeClass("active")
            .find(".top-menu")
            .css({
                display: "none"
            })
    }

    // 事件添加部分
    // 处理顶部隐藏显示功能
    $(".suning-banner li").on("mouseenter", suningNavLeftHover)
    $(".suning-banner li").on("mouseleave", suningNavLeftOver)
})

// 轮播图导航
$(function () {
    function navSuningHover() {
        $(this)
            .addClass("active")
            .find(".nav-menu")
            .css({
                display: "block"
            })
    }
    function navSuningOver() {
        $(this)
            .removeClass("active")
            .find(".nav-menu")
            .css({
                display: "none"
            })
    }
    $(".nav-suning .bottom-nav .nav-left li").on("mouseenter", navSuningHover)
    $(".nav-suning .bottom-nav .nav-left li").on("mouseleave", navSuningOver)
})

// 轮播图
var mySwiper = new Swiper('.swiper', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    speed: 500,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    effect: "fade",

    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
})