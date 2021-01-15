// 分类 变换
const li_list = document.querySelectorAll('.nav li')
const span = document.querySelector('.classify > p > span')

li_list.forEach(function(item){
    
    item.addEventListener('click', function(){
        
        let a = this.innerHTML
        
        span.innerHTML = a

    })
})

// 渲染列表

// 获取最短ul
// 获取.falls下的ul
const uls = document.querySelectorAll('.show > ul')

let start = 0

// 准备一个开关
let flag = true 

//获取最短ul函数
function getMinUl(){

    let minUl = uls[0];

    for(let i = 0; i < uls.length; i++){

        if(uls[i].offsetHeight < minUl.offsetHeight){

            minUl = uls[i]
        }
    }
    
    return minUl

}

// 请求数据
// getList()
// function getList(){

//     if(!flag) return

//     flag = false

//     ajax({
//         url:'/ft',
//         data:{
//             category_id: '5c8117e3405dd98844726b95',
//             start: start,
//             limit: 0
//         },
//         success(res){
//             console.log(res)

//             start = res.data.next_start

//             bindHtml(res.data.object_list)

//             flag = true
//         }
//     })
// }

//渲染页面
const a =  [1,2,,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
bindHtml(a)
function bindHtml(list){

    list.forEach(item =>{
        // const height = item.photo.height * 235 / item.photo.width

        const str = `
            <li>
                <div class="top">
                    <img src="../images/O1CN01DStz6G1f3bNtP40zx_!!64763951.jpg_500x500xz.jpg" alt="">
                </div>
                <div class="bottom">
                    <div class="explain">雪玛丽化妆棉卸妆棉片厚款眼部正品纯棉盒装脸部女卸妆用一次性</div>
                    <div class="Tmall">
                        <p>天猫</p>
                        <p>3元券</p>
                    </div>
                    <div class="original">
                        原价：￥<span>9.9</span>
                    </div>
                    <div class="now">
                        到手价：￥<span>6.9</span>
                    </div>
                </div>
            </li>
        `
        const min = getMinUl()
        
        min.innerHTML += str
    })
}
