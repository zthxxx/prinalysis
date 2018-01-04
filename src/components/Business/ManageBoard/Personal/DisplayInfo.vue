<template>
  <transition name="float-fade">
    <div>
      <header class="user-header">
        <figure class="avatar">
          <img :src="user.avatar" alt="avatar"/>
          <figcaption class="nickname">
            <span>{{user.nickname}}</span>
          </figcaption>
        </figure>
      </header>
      <div class="user-info">
        <div class="row">
          <span class="school">学校：{{user.lastPointAddress.join('')}}</span>
          <span class="name">收件姓名：{{user.nickname}}</span>
        </div>
        <div class="row">
          <span class="phone">手机：{{user.username}}</span>
          <span class="address">默认收件地址：{{user.address}}</span>
        </div>
      </div>
      <footer class="footer">
        <el-button class="footer-button" type="primary" @click="change">修改信息</el-button>
        <el-button class="footer-button" type="primary" @click="signout">退出登录</el-button>
      </footer>
    </div>
  </transition>
</template>

<script>
  import { signout } from '@/api'
  import * as types from '@/store/mutation-types'
  import { mapModel } from '@/utils/tools'

  export default {
    name: 'display-info',
    header: '我的信息',
    props: {},
    data () {
      return {}
    },
    computed: {
      ...mapModel('user', { user: types.SET_USER })
    },
    methods: {
      async signout () {
        await signout()
        this.$router.push({ name: 'home' })
        this.user = null
      },
      change () {
        this.$router.push({ name: 'person-update' })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './display-info'
</style>
