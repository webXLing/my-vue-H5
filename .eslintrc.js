/*
 * @Author: web_XL
 * @Date: 2020-06-19 14:07:31
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-27 16:54:17
 * @Description: eslint 配置
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unreachable": 2,//不能有无法执行的代码
    "eol-last": 0,//文件以单一的换行符结束
    "quotes": 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
