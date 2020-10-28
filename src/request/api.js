/*
 * @Author: web_XL
 * @Date: 2020-10-27 15:26:20
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-28 10:30:45
 * @Description: 
 */
import { Api } from "./http"

// 
export const getInfo = data => Api('/college/user/qrCode', data);

export const userBind = data => Api('/college/user/bind', data);

// app版本管理
export const infoAppVersion = data => Api('/college/info/appVersion', data);



