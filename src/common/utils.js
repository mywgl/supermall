/**
 * 防抖函数
 * @param func  需要多次执行的函数
 * @param delay 等待时间
 * @returns {function(...[*]=)}
 */
export function debounce(func, delay) {
  //使用闭包需要共享这个对象 否则每次使用这个debounce函数返回的函数
  // 就会重新创建一个setTimout对象达不到防抖的效果
  let timer = null
  return function (...args) {
    if (timer) clearTimeout()
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

//时间格式化工具
export function formatDate(date, format) {
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      let str = o[k] + '';
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  return format
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
