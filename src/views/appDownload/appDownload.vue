<!--
 * @Author: web_XL
 * @Date: 2020-10-26 16:14:24
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-28 11:18:45
 * @Description: 下载页
-->
<template>
  <div class="wrapper fl-c-c">
    <!-- 微信下直接打开App -->
    <wx-open-launch-app id="launch-btn"
                        @error="handleErrorFn"
                        @launch="handleLaunchFn"
                        appid="wxd8799b17ff675637"
                        extinfo="这里是微信H5传递给APP的指定参数">
      <script type="text/wxtag-template">
        <style>.btn { display: flex;align-items: center; }</style>								
						<div  class="btn" style="border-radius: 50px;font-size:15px;color:#ffffff;font-weight:700;padding: 0 50px;height:45px;line-height: 45px;background-color: #FF9700;margin: 0 auto;">前往贝瓦儿歌</div>					
					</script>
    </wx-open-launch-app>
    <div class="userbox fl-c-c">
      <img class="avator"
           v-if="userInfo.portrait"
           :src="userInfo.portrait"
           alt="">
      <img class="avator"
           v-else
           src="@/assets/img/img_nor_touxiang@2x.png">

      <div class="name">{{userInfo.username || "---"}}</div>
      <div class="phone"
           v-if="userInfo.phone">phone：{{userInfo.phone | phoneFilter}}</div>
      <img class="imgcode"
           v-if="userInfo.qr_code"
           :src="userInfo.qr_code"
           alt="">
      <div v-else
           class="imgcode"></div>

    </div>

    <van-button type="primary"
                class="d-btn"
                @click="toDownLoad">下载</van-button>

    <!-- 获取手机号 -->
    <van-popup v-model="phonePop"
               :close-on-click-overlay="false"
               class="phbox fl-c-c">
      <div class="title">请输入手机号</div>

      <input type="tel"
             v-model="phone"
             placeholder="请输入手机号码"
             class="input">
      <van-button type="primary"
                  @click="bindPhone"
                  class="tj-btn">提交</van-button>
      <van-button type="primary"
                  class="qx-btn"
                  @click="cancelPop">取消</van-button>
    </van-popup>

    <!-- 浏览器打开 -->
    <van-popup v-model="openPop"
               class="openPop">
      <img src="@/assets/img/img_yindaoye@2x.png"
           class="opimg">
    </van-popup>

  </div>
</template>

<script>
import { getInfo, userBind, infoAppVersion } from "@/request/api"
import { getCookie } from "@/utils/common"
import { isPhone } from "@/utils/RegExps"



export default {
  components: {},
  props: {},
  data () {
    return {
      phonePop: false,
      openPop: false,
      phone: "",
      // token: getCookie("token") || ''
      token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzb2wiLCJhdWQiOiJhZG1pbiIsIm5iZiI6MTYwMzc5MDkxNiwiaWF0IjoxNjAzNzkwOTE2LCJ1c2VyX2lkIjoyfQ.xKEiJ0vdUUlGsyhI0hxxXMadk6CI8w1GGvNKZ8riHew",
      userInfo: {},
      ios_download_url: "",
      android_download_url: ""
    }
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * 监听error 函数
     */
    handleErrorFn (e) {
      console.log("【这里是error 函数】" + JSON.stringify(e))
      if (e.isTrusted == false) {
        // alert("跳转失败")
        window.open("https://a.app.qq.com/o/simple.jsp?pkgname=com.slanissue.apps.mobile.erge&g_f=******")
      }
    },
    /**
     * 监听launch 函数
     */
    handleLaunchFn (e) {
      console.log("【这里是launch 函数】" + JSON.stringify(e))
    },
    cancelPop () {
      this.phonePop = false
      this.handleNextPage()
    },
    toDownLoad () {
      this.phonePop = true
    },

    handleNextPage () {
      let d = new Date();
      let t0 = d.getTime();
      // 判断是安卓还是ios
      if (this.isAndroid_ios()) {
        if (this.isWeiXin()) {
          // 引导用户在浏览器中打开
          // this.$toast('请在浏览器中打开本链接');
          this.openPop = true
          return;
        }
        //Android
        if (this.openApp('msfacepay://')) {
          this.openApp('msfacepay://');
        } else {
          //由于打开需要1～2秒，利用这个时间差来处理－－打开app后，返回h5页面会出现页面变成app下载页面，影响用户体验
          let delay = setInterval(function () {
            let d = new Date();
            let t1 = d.getTime();
            if (t1 - t0 < 3000 && t1 - t0 > 2000) {
              window.location.href = "app下载地址";
            }
            if (t1 - t0 >= 3000) {
              clearInterval(delay);
            }
          }, 1000);
        }
        // window.location.href = "msfacepay://";
        // window.setTimeout(function(){
        //  Alert.hint('暂未开通，敬请期待', 1500);
        //  // window.location.href = "https://itunes.apple.com/cn/app/id1419477919";//打开app下载地址，由app开发人员提供
        // },2000)
      } else {
        if (this.isWeiXin()) {
          window.location.href = 'https://itunes.apple.com/cn/app/id1419477919'
          return;
        }
        //IOS
        // window.location.href = 'msfacepay://'
        // if(openApp('msfacepay://')){  
        //     openApp('msfacepay://');
        // }else{
        //     var delay = setInterval(function(){
        //         var d = new Date();
        //         var t1 = d.getTime();
        //         if( t1-t0<3000 && t1-t0>2000){
        //             alert('请下载APP');
        //             window.location.href = "https://itunes.apple.com/cn/app/id1419477919";
        //         }
        //         if(t1-t0>=3000){
        //             clearInterval(delay);
        //         }
        //     },1000);
        // }
        //iOS不支持iframe打开APP
        window.location.href = "msfacepay://";
        window.setTimeout(function () {
          window.location.href = "https://itunes.apple.com/cn/app/id1419477919";//打开app下载地址，由app开发人员提供
        }, 2000)
      }
    },

    //判断是否微信
    isWeiXin () {
      if (/MicroMessenger/gi.test(navigator.userAgent)) {
        return true;
      } else {
        return false;
      }
    },
    //判断是安卓还是iOS
    isAndroid_ios () {
      let u = navigator.userAgent, app = navigator.appVersion;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
      return isAndroid == true ? true : false;
    },
    openApp (src) {
      // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
      // 否则打开a标签的href链接
      let ifr = document.createElement('iframe');
      ifr.src = src;
      ifr.style.display = 'none';
      document.body.appendChild(ifr);
      window.setTimeout(function () {
        document.body.removeChild(ifr);
      }, 2000);
    },


    // 获取用户信息
    async getUserInfo () {
      let res = await getInfo({
        token: this.token

      })
      this.userInfo = res.data
    },

    // 邀请绑定
    async bindPhone () {
      if (isPhone(this.phone)) {
        this.$toast("请输入正确的手机号!")
      }

      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '加载中...',
      });
      try {
        let res = await userBind({
          token: this.token,
          phone: this.phone
        })
        if (res.status === 0) {
          this.$toast("绑定成功!")
          this.phonePop = false
          this.handleNextPage()
        }
      } catch (error) {

      } finally {
        this.$toast.clear()
        console.log("finally")
      }

    },
    // app 信息
    async getAppInfo () {
      let res = await infoAppVersion({
        token: this.token
      })
      this.ios_download_url = res.data.ios_download_url

      // this.android_download_url = res.data.android_download_url
      this.android_download_url = "https://api.sports120.com/app/car.php"


    },

  },
  created () {
    let { token = "" } = this.$route.query
    this.token = token
  },
  mounted () {
    this.getUserInfo()
    this.getAppInfo()
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  background: #85c1fb url("../../assets/img/bg_tuiguang@2x.png") no-repeat 0 0 /
    100% auto;
  padding-top: 14vh;
  .userbox {
    width: 526px;
    height: 698px;
    background: #ffffff;
    border-radius: 32px;
    white-space: nowrap;
    position: relative;
    padding-top: 96px;
    .avator {
      width: 136px;
      height: 136px;
      background: rgba(0, 0, 0, 0);
      border: 8px solid #fff;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate3d(-50%, -50%, 0);
    }

    .img {
      width: 128px;
      height: 128px;
      background: rgba(0, 0, 0, 0);
    }
    .name {
      width: 204px;
      height: 54px;
      font-size: 44px;
      font-family: Roboto, Roboto-Medium;
      font-weight: 500;
      text-align: center;
      color: #18212d;
      line-height: 54px;
    }
    .phone {
      width: 252px;
      height: 32px;
      font-size: 24px;
      font-family: Roboto, Roboto-Regular;
      font-weight: 400;
      text-align: center;
      color: #adb4be;
      line-height: 32px;
      margin-top: 4px;
    }
    .imgcode {
      width: 400px;
      height: 400px;
      background: #eee;
      margin-top: 48px;
      // display: inline-block;
    }
  }
  .d-btn {
    width: 526px !important;
    height: 96px !important;
    border: none;
    margin-top: 64px;
    background: #ffffff;
    border-radius: 48px;

    width: 64px;
    height: 32px;
    font-size: 32px;
    font-family: Source Han Sans CN, Source Han Sans CN-Medium;
    font-weight: 700;
    text-align: center;
    color: #0b77f3;
  }

  .phbox {
    width: 552px;
    height: 508px;
    background: #ffffff;
    border-radius: 16px;
    .title {
      width: 100%;
      font-size: 36px;
      font-family: Source Han Sans CN, Source Han Sans CN-Medium;
      font-weight: 500;
      text-align: center;
      color: #18212d;
      line-height: 114px;
      height: 114px;
      border-bottom: 2px solid #dfe5ee;
      margin-bottom: 57px;
    }
    .input {
      width: 424px;
      height: 88px;
      background: #f6f9fe;
      border-radius: 8px;
      outline: none;
      padding: 0;
      padding-left: 24px;
    }
  }

  .tj-btn {
    width: 424px;
    height: 72px;
    background: linear-gradient(133deg, #2189ff 6%, #016fec 99%);
    border-radius: 4px;

    font-size: 32px;
    font-family: Source Han Sans CN, Source Han Sans CN-Regular;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    line-height: 72px;
    border: none;
    margin-top: 64px;
  }

  .qx-btn {
    width: 424px;
    height: 72px;
    background: #fff;
    border-radius: 4px;

    font-size: 32px;
    font-family: Source Han Sans CN, Source Han Sans CN-Regular;
    font-weight: 400;
    text-align: center;
    color: #adb4be;
    line-height: 72px;
    border: none;
  }

  .input::placeholder {
    color: #adb4be;
    font-size: 32px;
  }

  .opimg {
    width: 750px;
    height: 512px;
    position: absolute;
    right: 0;
    top: 48px;
  }
  .openPop {
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
</style>