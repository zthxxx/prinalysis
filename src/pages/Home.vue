<template>
  <transition name="fade">
    <article class="content container">
      <div class="index">
        <div class="banner">
          <img src="../assets/img/home/home-banner.jpg" alt="">
          <div class="float-div">
            <div class="div-center">
              <router-link :to="{name: 'print'}">
                <el-button type="primary" class="print-btn" size="large">立即打印</el-button>
              </router-link>
            </div>
          </div>
        </div>
        <depict-card :description="description"></depict-card>
        <div class="depict-foot">
          <div>
            <img src="../assets/img/home/getup.png" class="foot-img-left">
            <img src="../assets/img/home/struggle.png" class="foot-img-right">
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
        </div>
        <footer>
          <div class="cooperation">
            <span class="payMethod">支付方式：</span>
            <img src="../assets/img/home/wxPay.png" alt="wxPay">
            <img src="../assets/img/home/aliPay.png" alt="aliPay">
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
  import depictCard from '@/components/DepictCard'
  export default {
    name: 'home',
    data () {
      return {
        description: [
          {
            img: require('@/assets/img/home/des-1.png'),
            title: '快印预先打印，无需等待立即取件',
            depicts: [
              'xxxxxxxxxXXXXXXXXxxxxxxxxxxxx',
              'oooooooooooOOOOOOOOOOOOOooooooooOOOOOOOOOOOOooooooo',
              'ooooOOOooOOooOOOOOoOoOoOooooOooxooooOoooo'
            ]
          },
          {
            img: require('@/assets/img/home/des-1.png'),
            title: '快印预先打印，无需等待立即取件',
            depicts: [
              'xxxxxxxxxXXXXXXXXxxxxxxxxxxxx',
              'oooooooooooOOOOOOOOOOOOOooooooooOOOOOOOOOOOOooooooo',
              'ooooOOOooOOooOOOOOoOoOoOooooOooxooooOoooo'
            ]
          },
          {
            img: require('@/assets/img/home/des-1.png'),
            title: '快印预先打印，无需等待立即取件',
            depicts: [
              'xxxxxxxxxXXXXXXXXxxxxxxxxxxxx',
              'oooooooooooOOOOOOOOOOOOOooooooooOOOOOOOOOOOOooooooo',
              'ooooOOOooOOooOOOOOoOoOoOooooOooxooooOoooo'
            ]
          }
        ]
      }
    },
    components: {depictCard}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/home"
  @import "../style/_animate"
</style>
