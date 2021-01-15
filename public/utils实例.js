//封装运动函数
function move(ele,target,fn){
    let count = 0;
    for(let key in target){
        count++;
        if(key == 'opacity') target[key] *= 100;
        const timer = setInterval(() => {
            let current;
            if(key == 'opacity') current = window.getComputedStyle(ele)[key] * 100;
            else current = parseInt(window.getComputedStyle(ele)[key]);
            let distance = (target[key] - current) / 10;
            distance = distance > 0 ? Math.ceil(distance) : Math.floor(distance);
            if(current == target[key]){
                count--;
                clearInterval(timer);
                if(count == 0) fn()
            } 
            else {
                if(key == 'opacity') ele.style[key] = (distance + current) / 100;
                else ele.style[key] = distance + current + 'px';
            }
        }, 20);
    }
}
//创建cookie
function setCookie(key, value, expires){
    if(!expires){
      document.cookie = key + '=' + value;
      return;
    }
    const time = new Date();
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires);
    document.cookie = `${key}=${value};expires=${time}`;
}
//获取cookie
function getCookie(key) {
    const obj = {}
  
    document.cookie.split('; ').forEach(item => {
      const t = item.split('=')
      obj[t[0]] = t[1]
    })
  
    return key ? obj[key] : obj
}

//删除cookie
function delCookie(key) {
    setCookie(key, '', -1)
}

//格式化字符串 封装成函数
function parseQueryString(str){
    var obj = { };
    arr = str.split('&');
    arr.forEach(function (item){
        var tpItem = item.split('=');
        obj[tpItem[0]] = tpItem[1];
    })
            return obj;
}
//console.log(parseQueryString('a=100&b=200&c=300'));

//把对象转换成查询字符串 封装成函数
function selectString(obj){
    var str = '';
    for(var key in obj){
        var strr = key + '=' + obj[key] + '&';
        str += strr;
    }
    return str.slice(0,-1);
}
//console.log(selectString({ a: 100, b: 200, c: 300 }));

// ajax
function ajax(options = {}) {
    // 1. 参数验证
    // 1-1. 验证 url 必填
    if (!options.url) {
      throw new Error('url 为必填选项')
    }
  
    // 1-2. 验证 method
    if (!(options.method === undefined || /^(get|post)$/i.test(options.method))) {
      throw new Error('目前只接受 GET 和 POST 请求, 请期待更新 ^_^')
    }
  
    // 1-3. 验证 async
    if (!(options.async === undefined || typeof(options.async) === 'boolean')) {
      throw new Error('async 只能传递一个布尔值')
    }
  
    // 1-4. 验证 data
    if (!(options.data === undefined || Object.prototype.toString.call(options.data) === '[object Object]' || /^(.+=.+&?)*[^&]$/.test(options.data))) {
      throw new Error('data 需要传递一个查询字符串 或者 对象数据类型2')
    }
  
    // 1-5. 验证 success
    if (!(options.success === undefined || typeof options.success === 'function')) {
      throw new Error('success 需要传递一个 function 数据类型')
    }
  
    // 1-6. 验证 error
    if (!(options.error === undefined || typeof options.error === 'function')) {
      throw new Error('error 需要传递一个 function 数据类型')
    }
  
    // 1-7. 验证 dataType
    if (!(options.dataType === undefined || typeof(options.dataType) === 'boolean')) {
      throw new Error('dataType 只能传递一个布尔值')
    }
  
    // 2. 设置默认值
    const _default = {
      url: options.url,
      method: options.method || 'GET',
      async: typeof options.async === 'boolean' ? options.async : true,
      data: options.data || '',
      success: options.success || function () {},
      error: options.error || function () {},
      dataType: typeof options.dataType === 'boolean' ? options.dataType : true,
    }
    if (typeof _default.data === 'object') {
      _default.data = queryStringify(_default.data)
    }
    if (_default.method.toUpperCase() === 'GET' && _default.data) {
      _default.url += '?' + _default.data
    }
  
    // 3. 发送 ajax 请求
    const xhr = new XMLHttpRequest()
    xhr.open(_default.method, _default.url, _default.async)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
        _default.success(_default.dataType ? JSON.parse(xhr.responseText) : xhr.responseText)
      }
      if (xhr.readyState === 4 && xhr.status === 404) {
        _default.error(xhr.statusText)
      }
    }
    if (_default.method.toUpperCase() === 'GET') {
      xhr.send()
    } else {
      xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
      xhr.send(_default.data)
    }
  }
  
  // promsie - ajax
  function pAjax(options = {}) {
    // 返回一个 promise 对象数据类型
    return new Promise(function (resolve, reject) {
      // 要执行异步的事情
      // 我的异步事情就是 ajax 的封装
      ajax({
        url: options.url,
        async: options.async,
        data: options.data,
        dataType: options.dataType,
        method: options.method,
        success (res) {
          resolve(res)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }

//将输入的 obj 转换成 queryString 格式的字符串
function queryStringify(obj) {
  var str = ''
  for (var key in obj) {
    str += key + '=' + obj[key] + '&'
  }
  return str.slice(0, -1)
}