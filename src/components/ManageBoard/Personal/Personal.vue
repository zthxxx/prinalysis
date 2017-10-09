<template>
  <transition name="float-fade">
    <div>
      <div class="user-header">
        <span><img class="avatar" :src="user.avatar" alt="avatar"/></span>
        <span class="nickname">{{user.nickname}}</span>
      </div>
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
      <div class="footer">
        <el-button class="footer-button" type="primary">修改信息</el-button>
        <el-button class="footer-button" type="primary" @click="signout">退出登录</el-button>
      </div>
    </div>
  </transition>
</template>

<script>
  import {signout} from '@/api'
  import * as types from '@/store/mutation-types'
  import {mapModel} from '@/utils/tools'

  export default {
    name: 'personal',
    header: '我的信息',
    props: {},
    data () {
      return {}
    },
    methods: {
      async signout () {
        await signout();
        this.user = null;
        this.$router.push({name: 'home'});
      }
    },
    computed: {
      ...mapModel('user', {user: types.SET_USER})
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './personal'
</style>
