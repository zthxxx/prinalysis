<template>
  <header>
    <div class="container">
      <div class="left">
        <a href="/">
          <img :src="logo" alt="logo" class="nav-logo">
        </a>
        <el-menu :default-active="navIndex" class="nav-list" mode="horizontal" router>
          <el-menu-item index="/home" class="nav-item">主页</el-menu-item>
          <el-menu-item index="/print" class="nav-item">
            打印
            <span class="count" v-if="fileList.length">{{fileList.length}}</span>
          </el-menu-item>
          <el-menu-item index="/library" class="nav-item">校园文库</el-menu-item>
          <el-menu-item index="/contact" class="nav-item">联系我们</el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <el-menu :default-active="navIndex" class="nav-list"
                 mode="horizontal"
                 v-if="user"
                 router>
          <el-menu-item index="/user" class="nav-item user">
            <div class="text">
              <div>{{this.accessMap[user.access]}}</div>
              <div class="nick">{{user.nickname}}</div>
            </div>
            <img :src="user.avatar" alt="avatar">
          </el-menu-item>
        </el-menu>
        <el-button icon="fa-weixin" class="nav-item nav-button"
                   v-else
                   @click="login">
          微信登录
        </el-button>
      </div>
    </div>
    <login-card ref="login"></login-card>
  </header>
</template>

<script>
  import {mapState} from 'vuex'
  import loginCard from '@/components/LoginCard'
  export default {
    name: 'header-top',
    data () {
      return {
        logo: require('@/assets/img/logo.png'),
        accessMap: {
          user: '个人中心',
          vendor: '商家管理',
          manager: '后台管理'
        }
      }
    },
    computed: {
      ...mapState('print', ['fileList']),
      ...mapState('user', ['user']),
      navIndex () {
        return this.$route.path.match(/^(\/[^\/]*)/)[1];
      }
    },
    methods: {
      login () {
        this.$refs.login.open();
      }
    },
    components: {loginCard}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./header-top"
</style>
