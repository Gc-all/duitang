// 返回顶部
$(window).scroll(function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollTop > 10? $('.top').fadeIn(100) : $('.top').fadeOut(100)
    
})
$('.top').click(function () {
    $('html,body').animate({scrollTop : 0}, 10)
})

// 头部搜索框
$(window).scroll(function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    scrollTop > 50? $('.search').fadeIn(500) : $('.search').fadeOut(500)
})


// 划过分类区
const li_list = document.querySelectorAll('.c-left > ul >li')



li_list.forEach(function(item){
    item.addEventListener('mouseover',function(){
        
        let str =`
            <div>
                <h3>美妆</h3>
                <span>口红</span>
                <span>粉底</span>
                <span>妆前乳</span>
                <span>眉笔</span>
                <span>眼妆</span>
                <span>腮红</span>
                <span>美甲</span>
            </div>
        `
        item.innerHTML += str

    })
    
    item.addEventListener('mouseout',function(){
        
        const div = document.querySelector('.c-left > ul >li >div')

        div.remove()
        
    })

    item.addEventListener('click',function(){

        window.location.href = './details.html'
    })
    
})


// [
//     {
//         cate_one: '美妆',
//         cate_one_id: 1,
//         cate_two_list: [ { cate_two_name: '口红' }, { cat_two_name: '粉底' } ]
//     }

// ]


