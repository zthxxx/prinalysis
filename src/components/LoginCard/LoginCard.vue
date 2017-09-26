<template>
  <div>
    <transition name="fade">
      <div class="modal-wrapper" v-if="visible">
        <div class="modal-backdrop"></div>
        <div class="login-modal" tabindex="0">
          <div class="login-inner">
            <div class="login-content">
              <div>
                <div class="login-header">
                  <h1 class="login-header-title">登录知书</h1>
                  <h2 class="login-header-subTitle">与世界分享你的知识、经验和见解</h2>
                </div>
                <div class="login-flow">
                  <div class="flow-account">
                    <el-input v-model="form.username" placeholder="请输入手机号" class="account" autofocus>
                    </el-input>
                  </div>
                  <div class="flow-password">
                    <el-input v-model="form.password" placeholder="密码" :type="syssee ? 'text' : 'password'"
                              :class="{password: form.password && !syssee}">
                      <el-button slot="append" class="plain-button" :icon="syssee ? 'fa-eye' : 'fa-eye-slash'"
                                 @click="syssee = !syssee"></el-button>
                    </el-input>
                  </div>
                  <div class="login-options">
                    <el-button class="switch-type">手机验证码登录</el-button>
                    <el-button class="forget-pass">忘记密码？</el-button>
                  </div>
                  <el-button class="submit" @click="submit">登录</el-button>
                  <div class="login-footer">
                    <span class="footer-text">
                      <el-button class="plain-button" @click="close">新用户注册</el-button>
                    </span>
                    <span class="footer-separate"> · </span>
                    <span class="footer-text">
                      <el-button class="plain-button" @click="close">二维码登录</el-button>
                    </span>
                    <span class="footer-separate"> · </span>
                    <span class="footer-text">
                      <el-button class="plain-button" @click="close">社交账号登录</el-button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-button class="close" icon="close" @click="close"></el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'login-card',
    data () {
      return {
        visible: false,
        form: {
          username: '',
          password: ''
        },
        syssee: false
      }
    },
    methods: {
      open () {
        this.visible = true;
      },
      close () {
        this.visible = false;
      },
      submit () {
        console.info(this.form);
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './login-card'
</style>
