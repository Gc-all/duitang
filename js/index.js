//轮播图
//获取元素
var banner = document.querySelector('.ban-left');
var imgBox = document.querySelector('.imgBox');
var pointBox = document.querySelector('.pointBox');
// console.log(pointBox);
var leftRightBox = document.querySelector('.leftRight');
var leftBtn = document.querySelector('.left');
// console.log(leftBtn)
var rightBtn = document.querySelector('.right');
// console.log(rightBtn);
const banner_width = banner.clientWidth;
let index = 1;
let timer = 0;
let flag = true;

//根据图片的数量来创建节点
setPoint();
function setPoint() {
    let frg = document.createDocumentFragment();
    for (let i = 0; i < imgBox.children.length; i++) {
        let li = document.createElement('li')
        frg.appendChild(li);
        if (i == 0) {
            li.classList.add('active');
        }
        li.dataset.page = i;
    }
    pointBox.appendChild(frg);
}
//复制第一张和最后一张
copyEle();
function copyEle() {
    const first = imgBox.firstElementChild.cloneNode(true);
    const last = imgBox.lastElementChild.cloneNode(true);
    imgBox.appendChild(first);
    imgBox.insertBefore(last, imgBox.firstChild);
    imgBox.style.width = imgBox.children.length * 100 + '%';
    imgBox.style.left = -banner_width + 'px';
}
//自动轮播
autoPlay();
function autoPlay() {
    timer = setInterval(() => {
        index++;
        move(imgBox, { left: -banner_width * index }, moveEnd);
    }, 2000);
}
//结束函数
function moveEnd() {
    if (index == imgBox.children.length - 1) {
        index = 1;
        imgBox.style.left = -index * banner_width + 'px';
    }
    if (index == 0) {
        index = imgBox.children.length - 2;
        imgBox.style.left = -banner_width * index + 'px'
    }
    for (let i = 0; i < pointBox.children.length; i++) {
        pointBox.children[i].classList.remove('active');
    }
    pointBox.children[index - 1].classList.add('active');
    flag = true;
}
//划入划出
overOut();
function overOut() {
    banner.addEventListener('mouseover', () => {
        clearInterval(timer);
    })
    banner.addEventListener('mouseout', () => {
        autoPlay();
    })
}
//左右切换
leftRight();
function leftRight() {
    rightBtn.addEventListener('click', function () {
        if (flag == false) return;
        flag = false;
        index++;
        move(imgBox, { left: -banner_width * index }, moveEnd)
    })
    leftBtn.addEventListener('click', function () {
        if (flag == false) return;
        flag = false;
        index--;
        move(imgBox, { left: -banner_width * index }, moveEnd)
    })
}
//焦点切换
pointChange();
function pointChange() {
    pointBox.addEventListener('click', (ev) => {
        ev = ev || window.event;
        const target = ev.target || ev.srcElement;
        if (target.nodeName == 'LI') {
            if (flag == false) return;
            flag = false;
            const page = target.dataset.page - 0;
            index = page + 1;
            console.log(index);
            move(imgBox, { left: -index * banner_width }, moveEnd)
        }
    })
}

//BOM操作处理
setChange();
function setChange() {
    document.addEventListener('visibilitychange', () => {
        let state = document.visibilityState;
        if (state == 'hidden') clearInterval(timer);
        if (state == 'visible') autoPlay()
    })
}


// head分类
//获取元素
const sort = document.querySelector('.sort');
const sort_act = document.querySelector('.sort > p');
const sort_btn = document.querySelector('.sort > ul');
const search = document.querySelector('.header > .search');
const input = document.querySelector('.header > .search > input');
const search_div = document.querySelector('.header > .search > div')
//鼠标划入划出事件
$(sort).on('mouseover', function(){
    sort_btn.style.opacity = '1';
    sort_act.classList.add('act');
})
$(sort).on('mouseout', function(){
    sort_act.classList.remove('act');
    sort_btn.style.opacity = '0';
})


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
insertText();

$(input).on('input', function(){
    insertText()
    search_div.style.display= 'block';
})
$(input).on('blur', function(){
    search_div.style.display = 'none';
})

//分类的点击事件
$(sort_btn).on('click', 'li', function () {
    let text = $(this).text();
    // console.log(text);
    if(text == '家居生活'){
        window.location.href = '../views/family.html'
    }else if(text == '美食菜谱'){
        window.location.href = '../views/food.html'
    }else{
        setCookie('dian', text);
        window.location.href = `../views/sort_sear.html`;
    }
})



//获取数据
getList()
function getList(){
    ajax({
        url: '/dt',
        data: {
            start: 0,
            limit: 18
        },
        success (res) {
        //   start = res.data.next_start
            console.log(res.data.object_list)
          // 要根据 res.data.object_list 去渲染页面
          bindHtml(res.data.object_list)

          // 到这里表示渲染页面完毕了
        //   flag = true
        }
      })
}
const conLeft = document.querySelector('.con-left > div')
function bindHtml(list){
    list.forEach(item => {
        let str = `
                 <ol>
                    <li class="day active" data-id="${item.resource_id}">
                        <div class="total">
                            <div><img src="${ item.atlas.sender.avatar }" alt=""></div>
                            <p>${ item.atlas.sender.username }<br>
                                <span>${ item.resource_info }</span>
                            </p>
                        </div>
                        <p class="intro">壁纸控</p>
                        <div class="info-img">
                            <img src="${ item.atlas.blogs[0].photo.path }" alt="">
                            <img src="${ item.atlas.blogs[1].photo.path }" alt="">
                            <img src="${ item.atlas.blogs[2].photo.path }" alt="">
                            <img src="${ item.atlas.blogs[3].photo.path }" alt="">
                            <img src="${ item.atlas.blogs[4].photo.path }" alt="">
                        </div>
                        <div class="info-bot">
                            <p>赞</p>
                            <p>收藏</p>
                            <p style="border: none;">更多</p>
                        </div>
                    </li>
                    <li class="concern">
                        <div class="">暂无内容</div>
                    </li>
                </ol>
                `
        conLeft.innerHTML += str
    })
    suibian()
}

function suibian (){
    const conLeftLi = document.querySelectorAll('.day')
    conLeftLi.forEach(function (item){
        item.addEventListener('click',function() {
            setCookie('resource_id',this.dataset.id)
            window.location.href = './detail.html'
        })
    })
    
}

