<!--
 * @Author: web_XL
 * @Date: 2020-06-19 14:07:31
 * @LastEditors: web_XL
 * @LastEditTime: 2020-10-27 14:45:16
 * @Description: APP
-->
<template>
  <div id="app"
       @click="clicks">
    <transition :name="transitionName">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view class="router"></router-view>
      </keep-alive>
      <router-view class="router"
                   v-else></router-view>
    </transition>
  </div>
</template>
<script>
import defaultSetting from './settings'
export default {
  name: 'app',
  computed: {
    transitionName () {
      if (defaultSetting.needPageTrans) {
        return this.$store.state.direction
      }
      return ''
    }
  },
  methods: {
    // 修复 IOS12，微信 6.7.4+ 键盘不回弹的问题
    clicks (e) {
      let that = this
      let target = e.target
      let targetName = target.tagName.toLocaleLowerCase()
      if (
        !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) &&
        (targetName === "input" ||
          targetName === "textarea" ||
          targetName === "select")
      ) {
        let blurHandle = e => {
          target.removeEventListener("blur", blurHandle);
          setTimeout(() => {
            const scrollHeight =
              document.documentElement.scrollTop ||
              document.body.scrollTop ||
              0
            window.scrollTo(0, Math.max(scrollHeight - 1, 0))
          }, 100)
        }
        target.addEventListener("blur", blurHandle)
      }
    }
  },
}
</script>

<style lang="scss">
@import "./assets/css/reset.css";
@import "./assets/css/common.scss";

// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   color: #2c3e50;
//   width: 100%;
//   height: 100%;
//   position: relative;
// }

// .router {
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   overflow-x: hidden;
//   overflow-y: auto;
//   -webkit-overflow-scrolling: touch;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   // background-color: #fff;
// }

// .dis {
//   display: flex;
//   width: 200px;
//   height: 200px;
// }
</style>
