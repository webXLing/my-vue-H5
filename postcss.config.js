/*
 * @Author: web_XL
 * @Date: 2020-06-19 14:07:31
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-26 16:57:49
 * @Description: 
 */
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 75,
      propList: ['*'],
      selectorBlackList: ['.van-'] // 过滤掉.norem-开头的class，不进行rem转换
    }
  }
}
