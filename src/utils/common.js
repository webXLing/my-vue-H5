import md5 from 'js-md5';
const userAgent = navigator.userAgent;
const appSecre = "b8aa9afa94791b2b92bd89f7cd24f382";
// const appSecre = "abcdefg123";

window.md5 = md5
// 加密
export const getSingQuery = function (params) {
  let result = {}
  result.body = JSON.stringify({ ...params })
  result.timestamp = Date.parse(new Date()) / 1000;
  result.format = "json";
  result.version = "1.0.0";

  var arr = [];
  for (var i in result) {
    if (result[i] == null) result[i] = "";
    arr.push(i + "=" + result[i]);
  }
  var sing = arr.sort().join("&");
  sing += `&secret=${appSecre}`
  console.log(sing)
  result.signature = md5(sing).toUpperCase();

  return result;
}

//获取链接中的参数
export const GetRequest = function (url) {
  // var url = location.search // 获取url中"?"符后的字串
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    const arr = url.split("?");
    let str = arr[arr.length - 1];
    let strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};

//设置存储cookie
export function setCookie (c_name, value, expire = 20000) {
  let date = new Date();
  if (expire === 'session') {
    expire = void 0
  }

  date.setSeconds(date.getSeconds() + expire);
  document.cookie = `${c_name}=${escape(value)}; expires=${date.toGMTString()}`;
  // console.log(document.cookie)
}

//获取已存储的cookie
export function getCookie (c_name) {
  var arr;
  var reg = new RegExp("(^| )" + c_name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    // console.log(arr)
    return unescape(arr[2]);
  }
  return null;
}

//删除cookie
export function delCookie (c_name) {
  setCookie(c_name, "", -1);
}

// 支付宝/微信环境判别
export const webEnvironment = function () {
  // return "weixin"; // 记得注释
  // return "ali"; // 记得注释

  var userAgent = navigator.userAgent.toLowerCase();
  // console.log('userAgent', userAgent)
  if (userAgent.match(/Alipay/i) == "alipay") {
    return "ali";
    // }else if(userAgent.match(/MicroMessenger/i)=="micromessenger"){
  } else if (
    (userAgent.match(/MicroMessenger/i) == "micromessenger" &&
      userAgent.match(/Mobile/i) == "mobile") ||
    userAgent.match(/wechatdevtools/i) == "wechatdevtools"
  ) {
    return "weixin";
  }
  //alert("请用微信/支付宝扫码");
  return "";
};

//鉴别IOS环境
export const isIos = function () {
  return !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
};

//减法函数，用来得到精确的减法结果
export const Subtr = function (arg1, arg2) {
  let r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  // last modify by deeka
  // 动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
};

// js 运算  精度问题
export const $h = {
  // 除法函数，用来得到精确的除法结果
  // 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
  // 调用：$h.Div(arg1,arg2)
  // 返回值：arg1除以arg2的精确结果
  Div (arg1, arg2) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) { }
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) { }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
  },
  // 加法函数，用来得到精确的加法结果
  // 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
  // 调用：$h.Add(arg1,arg2)
  // 返回值：arg1加上arg2的精确结果
  Add (arg1, arg2) {
    arg2 = parseFloat(arg2);
    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(100, Math.max(r1, r2));
    return (this.Mul(arg1, m) + this.Mul(arg2, m)) / m;
  },
  // 减法函数，用来得到精确的减法结果
  // 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
  // 调用：$h.Sub(arg1,arg2)
  // 返回值：arg1减去arg2的精确结果

  // 获取两个小数 最大的放大位数(n) 使的两个小数都能变为整数后 再去相减 后处于n 保留小数后就可以得到结果
  Sub (arg1, arg2) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((this.Mul(arg1, m) - this.Mul(arg2, m)) / m).toFixed(n);
  },
  // 乘法函数，用来得到精确的乘法结果
  // 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
  // 调用：$h.Mul(arg1,arg2)
  // 返回值：arg1乘以arg2的精确结果

  // 由于js浮点数 计算有误差 所以 将小数 转为 整数后 然后将除以放大的倍数 这样就可以避免 js精度问题
  Mul (arg1, arg2) {
    arg1 = parseFloat(arg1);
    arg2 = parseFloat(arg2);
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) { }
    try {
      m += s2.split(".")[1].length;
    } catch (e) { }
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  },

  isNumber (arg) {
    return Object.prototype.toString.call(arg) === "[object Number]";
  }
};

export const openLocation = function (lat, long, name, address) {
  console.log("lat, long, name, address", lat, long, name, address);
  try {
    let type;
    // 如果在支付宝浏览器上
    if (/AlipayClient/.test(window.navigator.userAgent)) {
      type = 'ap';
    } else {
      type = 'wx';
    }
    eval(type).openLocation({
      latitude: parseFloat(lat), // 纬度，浮点数，范围为90 ~ -90
      longitude: parseFloat(long), // 经度，浮点数，范围为180 ~ -180。、
      name: name || "", // 位置名
      address: address || "", // 地址详情说明
      scale: 12 // 地图缩放级别,整形值,范围从1~28。默认为最大
      // infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
    });
  } catch (err) {
    console.log("openLocation", err);
  }
};

export const uniqueArr = function (arr) {
  return arr.filter(function (item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
};