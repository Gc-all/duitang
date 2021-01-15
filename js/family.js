const sort = document.querySelector('.sort');
const sort_act = document.querySelector('.sort > p');
const sort_btn = document.querySelector('.sort > ul');
const search = document.querySelector('.header > .search');
const input = document.querySelector('.header > .search > input');
const search_div = document.querySelector('.header > .search > div');
const list = document.querySelectorAll('.life > .list > ul');
const sec = document.querySelector('.sec > p > span > i');

//鼠标划入划出事件
$(sort).on('mouseover', function(){
    sort_btn.style.opacity = '1';
    sort_act.classList.add('act');
})
$(sort).on('mouseout', function(){
    sort_act.classList.remove('act');
    sort_btn.style.opacity = '0';
})
//搜索
function insertText(){
    let value = $(input).val();
    let str =  `
            <p>搜索含<span> ${value} </span>的图片</p>
            <p>搜索含<span> ${value} </span>的商品</p>
            <p>搜索含<span> ${value} </span>的专辑</p>
            <p>搜索含<span> ${value} </span>的文章</p>
            <p>搜索含<span> ${value} </span>的达人</p>
    `;
    search_div.innerHTML = str;
}

$(input).on('input', function(){
    insertText();
    search_div.style.display= 'block';
})
$(input).on('blur', function(){
    search_div.style.display = 'none';
})



//通过cookie 获取主页面传来的需要请求数据的变量
let text = getCookie('dian');
//分类的点击事件
$(sort_btn).on('click', 'li', function () {
    let text = $(this).text();
    if(text == '家居生活'){
        window.location.href = '../views/family.html'
    }else if(text == '美食菜谱'){
        window.location.href = '../views/food.html'
    }else{
        setCookie('dian', text);
        window.location.href = `../views/sort_sear.html`;
    }
})



//点击切换数据
//动态添加一个'一级分类框
let data = '家居生活';
let secInfo = '';
$(list).on('click', 'li', function () {
    // console.log('kkk');
    $('.content > ul').empty();
    data = `家居生活_${$(this).text()}`;
    getList();
    $(this).parent().siblings().find('li').removeClass('active');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    secInfo = $(this).text();
    secAdd(secInfo);
})
//动态分类标题
function secAdd(s){
    let str = `
        <span> > ${s}</span>
    `;
    sec.innerHTML = str;
}

//动态渲染列表
//第一步：先封装一个方法，用来找到四个ul中 高度最小的ul
const uls = document.querySelectorAll('.content > ul');
let flag = true;//开关，解决滑动过快是出现的问题
console.log(uls);
function getMinUl() {
    let minUl = uls[0];
    for(let i = 0; i < uls.length; i++){
        if(uls[i].offsetHeight < minUl.offsetHeight){
            minUl = uls[i];
        }
    }
    //函数返回高度最小的ul
    return minUl;
}

//第二步：请求每一条数据的 object_list，组装成一个li，放在最短的 ul中
let start = 0;
getList();
function getList() {
    //https://www.duitang.com/napi/blog/list/by_filter_id/
    if(!flag) return;
    flag = false;
    ajax({
    url: '/dtf',
    data : {
        include_fields: 'top_comments,is_root,source_link,item,buyable,root_id,status,like_count,sender,album,reply_count',
        filter_id: data ,
        start: start,
        _: 1608946096413
    },
    success(res){
        //每加载一次，start即下一次开始加载的序号，需要更新
        start = res.data.next_start;
        //需要用接收回来的res.data.object_list，来渲染页面，组装成一个li去插入页面；
        bindHTML(res.data.object_list);
        //请求成功，渲染页面结束
        flag = true;
    }
    })
}
//渲染页面的函数
function bindHTML(list){
    //console.log(list);
    for(let i = 0;i <list.length; i++){
        let height = list[i].photo.height * 280 / list[i].photo.width;
        const str = `
        <li>
            <div class="top" style="height: ${height}px">
                <img src="${list[i].photo.path}" alt="">
                <div>
                    <p>收集</p>
                    <p>点赞</p>
                    <p>评论</p>
                </div>
            </div>
            <div class="bottom">
                <div class="title">${list[i].msg}</div>
                <div class="fav">
                    <h3>${list[i].album.like_count}</h3>
                    <h3>${list[i].album.favorite_count}</h3>
                </div>
                <div class="author">
                    <div class="avatar">
                        <img src="${list[i].sender.avatar }" alt="">
                    </div>
                    <div class="name">${list[i].sender.username}</div>
                </div>
            </div>
          </li>
        `
        //拿到之前封装好的函数的返回值，即高度最小的ul
        const min = getMinUl();
        //将每一条li插入到敏中，然后再插入页面
        min.innerHTML += str;
    }
}
//给浏览器一个滚动事件，当最短的ul到屏幕底端的时候就该加载下一页了

window.onscroll = function () {
    //浏览器卷去的高
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //可视窗口的高度
    let winHeight = document.documentElement.clientHeight;
    //最短ul的高度
    let minUl = getMinUl();
    let ulHeight = minUl.offsetHeight;
    //最短ul的上方偏移量
    let ulTop = minUl.offsetTop;

    //进行条件判断(最短ul的高+最短ul的上方偏移量 <= 浏览器卷去的高+最短ul距离顶部的偏移量)
    if(ulHeight + ulTop <= winHeight + scrollTop){
        //console.log('底边已进入，该下一次请求了');
        getList();
    }
}

