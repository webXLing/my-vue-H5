/*
 * @Author: web_XL
 * @Date: 2020-10-17 15:57:00
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-17 16:05:28
 * @Description: 
 */
const idReg = /^[1-9]\d*$/
const phoneReg = /^1[3-9]\d{9}$/
const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

// 手机号
export const isPhone = (str) => {
  return phoneReg.test(str)
}

// 身份证
export const isIdCard = (str) => {
  return idCardReg.test(str)
}

// 邮箱
export const isEmail = (str) => {
  return emailReg.test(str)
}



