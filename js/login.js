//最上面的选项卡
$('.dl-zc > a').on('click',function(){
    $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
    $('.login-main>div')
        .removeClass('active')
        .eq($(this).index())
        .addClass('active')
})
//登录
$('.main-left button').on('click',async() => {
    const username = $('#username').val()
    const password = $('#password').val()
    //非空验证
    if (!username || !password) return alert('请正确填写用户名和密码')
    const { code, nickname } = await $.post('../server/login.php', { username, password }, null, 'json')
    if(!code) return alert('用户名或者密码不正确')
    setCookie('nieckname',nickname,60 * 60 * 24)
    const url = window.sessionStorage.getItem('url')
    window.location.href = `./${url ? url :'index'}.html`
})
//注册
//验证用户名是否重了
$('#textname').on('blur',async()=>{
    const textname = $('#textname').val()
    const {code} = await $.post('../server/zcyz.php', { textname }, null,'json')
    if(!code) return $('.labelname>span:first').addClass('active').siblings().removeClass('active')
    $('.labelname>span:first').removeClass('active')
})
//注册
const regObj = {
    textname: /^[0-9a-z]\w{5,11}$/,
    textpsw: /^\w{6,12}$/,
    textnick:/^.{4,8}$/
}
const inps = document.querySelectorAll('.information label input')
inps.forEach(function(item){
    item.addEventListener('input', yanzhengHandler)
})

$('.main-zc .btn').on('click',async ()=>{
    // 3-4. 提前准备一个计数器
    let count = 0

    // 循环遍历 inps
    inps.forEach(function (item) {
      // 3-3. 判断谁没有 pass 属性
      var res = item.getAttribute('pass')
      if (!res) {
        item.parentNode.children[2].classList.add('active')
      } else {
        count++
      }
    })

    if (count !== inps.length) {
      console.log('请按照规则完整填写表单')
      return
    }
    let textname = $('#textname').val()
    let textpsw = $('#textpsw').val()
    let textnick = $('#textnick').val()
    const { code } = await $.post('../server/zc.php',{ textname,textpsw,textnick },null,'json') 
    if(code) {
        alert('注册成功')
        textname = ''
        textpsw = ''
        textnick = ''
    }
  })

  
function yanzhengHandler(){
  let text = this.value
  let reg = regObj[this.id]
  if (!reg.test(text)) {
      $(this).parent().find('span').eq(1).addClass('active')

      // 消掉 input 身上的标识符
      this.removeAttribute('pass')
      return
  }

    // 验证通过
    $(this).parent().find('span').eq(1).removeClass('active')
    // 给 input 身上添加一个标识符
    this.setAttribute('pass', 1)
}
