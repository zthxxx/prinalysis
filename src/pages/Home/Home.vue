<template>
  <transition name="fade">
    <article class="content container" key="home">
      <div class="index">
        <section class="banner">
          <img :src="banner" alt="">
          <div class="float-div">
            <div class="div-center">
              <router-link :to="{name: 'print'}">
                <el-button type="primary" class="print-btn" size="large">立即打印</el-button>
              </router-link>
            </div>
          </div>
        </section>
        <depict-card :twigs="twigs" :description="description"></depict-card>
        <section class="depict-foot">
          <div>
            <img :src="foot.left" class="foot-img-left">
            <img :src="foot.right" class="foot-img-right">
            <div>
              开学加油哦<br/>
              云打印解烦恼~<br/>
              <router-link :to="{name: 'print'}">
                <el-button type="info" class="toPrint">
                  <span>赶紧快印一波 &gt;</span>
                </el-button>
              </router-link>
            </div>
          </div>
        </section>
        <footer>
          <div class="cooperation">
            <span class="payMethod">支付方式：</span>
            <img :src="weixinPayIcon" alt="wxPay">
            <img :src="aliPayIcon" alt="aliPay">
          </div>
          <div class="foot-section">
            Copyright © 2017 xxxx All Rights Reserved ICP备100000000-1
          </div>
        </footer>
      </div>
    </article>
  </transition>
</template>
<script>
  import { banner, foot, twigs } from '@/assets/img/home'
  import { weixinPayIcon, aliPayIcon } from '@/assets/img/pay'
  import depictCard from '$@/Stateless/DepictCard'

  export default {
    name: 'home',
    components: { depictCard },
    data () {
      return {
        banner,
        foot,
        weixinPayIcon,
        aliPayIcon,
        twigs,
        description: [
          {
            title: '快印预先打印，无需等待立即取件',
            depicts: [
              'xxxxxxxxxXXXXXXXXxxxxxxxxxxxx',
              'oooooooooooOOOOOOOOOOOOOooooooooOOOOOOOOOOOOooooooo',
              'ooooOOOooOOooOOOOOoOoOoOooooOooxooooOoooo'
            ]
          },
          {
            title: '快印预先打印，无需等待立即取件',
            depicts: [
              'xxxxxxxxxXXXXXXXXxxxxxxxxxxxx',
              'oooooooooooOOOOOOOOOOOOOooooooooOOOOOOOOOOOOooooooo',
              'ooooOOOooOOooOOOOOoOoOoOooooOooxooooOoooo'
            ]
          },
          {
            title: '快印预先打印，无需等待立即取件',
            depicts: [
              'xxxxxxxxxXXXXXXXXxxxxxxxxxxxx',
              'oooooooooooOOOOOOOOOOOOOooooooooOOOOOOOOOOOOooooooo',
              'ooooOOOooOOooOOOOOoOoOoOooooOooxooooOoooo'
            ]
          }
        ]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./home"
</style>
