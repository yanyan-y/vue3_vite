import * as CryptoJS from 'crypto-js'
export default {

  setToken (key, data) { //保存token
    return localStorage.setItem(key, data);
  },
  getToken (key) { //获取token
    return localStorage.getItem(key);
  },
  removeToken (key) { //删除token
    return localStorage.removeItem(key)
  },
  clear () { //删除token
    return localStorage.clear()
  },
  isPhone (value) { // 验证手机
    return /^1[3|4|5|6|7|8|9]\d{9}$/.test(value)
  },
  getDateDiff (dateTime) { //时间戳转文字显示
    let comTime = dateTime.replace(/-/g, '/')
    // console.log(comTime)
    let dateTimeStamp = new Date(comTime).getTime();
    // console.log(dateTimeStamp)
    let result = '';
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    // let halfamonth = day * 15;
    let month = day * 30;
    let year = day * 365;
    let now = new Date().getTime();
    // console.log(now)
    let diffValue = now - dateTimeStamp;
    // console.log(diffValue)
    if (diffValue <= 0) {
      result = "刚刚";
      // return;
    }
    let monthEnd = diffValue / month;
    let weekEnd = diffValue / (7 * day);
    let dayEnd = diffValue / day;
    let hourEnd = diffValue / hour;
    let minEnd = diffValue / minute;
    let yearEnd = diffValue / year;
    if (yearEnd >= 1) {
      result = comTime;
      // result = "" + parseInt(yearEnd) + "年前";
    } else if (monthEnd >= 1) {
      result = "" + parseInt(monthEnd) + "月前";
    } else if (weekEnd >= 1) {
      result = "" + parseInt(weekEnd) + "周前";
    } else if (dayEnd >= 1) {
      result = "" + parseInt(dayEnd) + "天前";
    } else if (hourEnd >= 1) {
      result = "" + parseInt(hourEnd) + "小时前";
    } else if (minEnd >= 1) {
      result = "" + parseInt(minEnd) + "分钟前";
    } else {
      result = "刚刚";
    }
    return result;
  },
  strTimestamp (str) { // 字符串转时间戳 '2015-03-05 17:59:00.0'
    str = str.substring(0, 19);
    str = str.replace(/-/g, '/');
    var timestamp = new Date(str).getTime();
    return timestamp
  },
  /**
   *加密处理
  */
  encryption (params) {
    let { data, type, param, key } = params
    const result = JSON.parse(JSON.stringify(data))
    if (type === 'Base64') {
      param.forEach(ele => {
        result[ele] = btoa(result[ele])
      })
    } else {
      param.forEach(ele => {
        var data = result[ele]
        key = CryptoJS.enc.Latin1.parse(key)
        var iv = key
        // 加密
        var encrypted = CryptoJS.AES.encrypt(
          data,
          key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
        result[ele] = encrypted.toString()
      })
    }
    return result
  },
  /**
   * 去除对象空值
   */
  deleValues (obj) {
    for (const key in obj) {
      if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
        delete obj[key]
      }
    }
    return obj
  },
  /**
   * 筛选枚举值
  */
  getValues (val, obj) {
    for (const key in obj) {
      if (val === parseInt(key)) {
        return obj[key]
      }
    }
  },
  // 去除首尾的空格
  trim: function (s) {
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  objStrTransition (objstr) { // 转换字符串对象
    return JSON.parse(JSON.stringify(objstr))
  },
  isObject (obj) { // 判断数据是否是对象 {}
    return {}.toString.call(obj) == '[object Object]'
  },
  hasObject (obj) { // 判断数据是否是对象{}，且对象长度 >0
    return this.isObject(obj) && Object.keys(obj).length > 0
  },
  // 判断数据是否是函数 function
  isFunction (obj) {
    return {}.toString.call(obj) === '[object Function]'
  },
  // 判断数据是否是数组 []
  isArray (obj) {
    return {}.toString.call(obj) === '[object Array]'
  },
  // 判断数据是否是数级 []，且长度>0
  hasArray (obj) {
    return this.isArray(obj) && obj.length > 0
  },
  // 判断数据是否是字符串
  isString (obj) {
    return {}.toString.call(obj) === '[object String]'
  },
  // 判断数据是否是数字
  isNumber (obj) {
    return {}.toString.call(obj) === '[object Number]'
  },
  // 判断数据是否有效
  isValid (obj) {
    return obj != undefined && obj != '' && obj != null || obj === 0 || obj === false
  },


}
