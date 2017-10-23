<template>
  <header>
    <div class="container">
      <nav class="left">
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
      </nav>
      <nav class="right">
        <el-menu :default-active="navIndex" class="nav-list"
                 mode="horizontal"
                 v-if="user"
                 router>
          <el-menu-item index="/user" class="nav-item user">
            <figure>
              <figcaption class="identity">
                <p>{{this.accessMap[user.access]}}</p>
                <p class="nick">{{user.nickname}}</p>
              </figcaption>
              <img :src="user.avatar" alt="avatar">
            </figure>
          </el-menu-item>
        </el-menu>
        <el-button icon="fa-weixin" class="nav-item nav-button"
                   v-else
                   @click="login">
          微信登录
        </el-button>
      </nav>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex';

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
      };
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
        this.$handleLogin();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./header-top"
</style>
