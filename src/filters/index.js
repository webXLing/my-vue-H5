const isNullOrEmpty = function (val) {
  if (val == null || val == "" || typeof val == undefined) {
    return true;
  } else {
    return false;
  }
};

const timeFormat = (value, format) => {
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let min = date.getMinutes();
  let s = date.getSeconds();
  let result = "";
  if (format == undefined) {
    result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d} ${
      h < 10 ? "0" + h : h
      }:${min < 10 ? "0" + min : min}:${s < 10 ? "0" + s : s}`;
  }
  if (format == "yyyy-mm-dd") {
    result = `${y}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`;
  }
  if (format == "yyyy-mm") {
    result = `${y}-${m < 10 ? "0" + m : m}`;
  }
  if (format == "mm-dd") {
    result = ` ${mm < 10 ? "0" + mm : mm}:${ddmin < 10 ? "0" + dd : dd}`;
  }
  if (format == "hh:mm") {
    result = ` ${h < 10 ? "0" + h : h}:${min < 10 ? "0" + min : min}`;
  }
  if (format == "yyyy") {
    result = `${y}`;
  }
  return result;
};

const falsyToZero = falsy => {
  return falsy ? falsy : 0;
};

const falsyToEmp = falsy => {
  return falsy ? falsy : "";
};

const timeFilter = num => {
  let date = new Date(num);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  var d = date.getDate();
  d = d < 10 ? "0" + d : d;
  var h = date.getHours();
  h = h < 10 ? "0" + h : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
  // return y + '-' + m + '-' + d
};

const strToEmp = str => {
  if (!str) return "";
  return str.split(" ")[0];
};

// 0000-00-00 00:00:00 => 0000.00.00
const timeFilter1 = str => {
  if (!str) return "";
  return str.split(" ")[0].replace(/-/g, ".");
};

// '1.800'=>1.8
const strToFloat = str => {
  if (!str) return "";
  return parseFloat(str);
};

const addZero = num => {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
};
// 12345676881 =>123 4567 6881
const phoneFilter = num => {
  if (!num) return "";
  num += "";
  return num.replace(/^(\d{3})(\d{4})/g, "$1 $2 ");
};

// 970518071000002 => 9705 1807 1000 002
const bankFilter = num => {
  if (!num) return "";
  num += "";
  return num.replace(/^(\d{4})(\d{4})(\d{4})(\d{4})/g, "$1 $2 $3 $4 ");
};


export {
  isNullOrEmpty,
  timeFormat,
  falsyToZero, // falsy  to   0
  falsyToEmp, // falsy to ''
  timeFilter, // 时间戳转 年月日 时分秒
  // falsyToZero
  strToEmp,
  timeFilter1,
  strToFloat,
  addZero,
  phoneFilter,
  bankFilter
};
