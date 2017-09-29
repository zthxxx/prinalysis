<template>
  <div>
    <modal-backdrop v-if="visible">
      <div class="login-modal" tabindex="0">
        <div class="login-inner">
          <el-button class="close" icon="close" @click="close"></el-button>
          <el-form ref="loginForm" class="login-content" :rules="rules" :model="form" v-if="!acceptCaptcha">
            <div class="login-header">
              <div class="login-header-title">{{header[mode].title}}</div>
              <div class="login-header-subTitle">{{header[mode].subtitle}}</div>
            </div>
            <div class="login-flow">
              <el-form-item class="flow-account" prop="username">
                <el-input v-model="form.username" placeholder="请输入手机号" class="account" @focus="registerable = true">
                  <el-select v-model="prefix" slot="prepend" placeholder="请选择"
                             :style="{width: `${prefixWidth}px`}">
                    <el-option v-for="{code, name} of countries"
                               :key="code"
                               :label="`${name}${code}`"
                               :value="JSON.stringify({code, name})">
                    </el-option>
                  </el-select>
                </el-input>
                <div class="endMask" v-if="mode != 'login' && !registerable">
                  <span class="await-time">该手机号已注册 · </span>
                  <el-button class="switch-type" @click="loginMode">直接登录</el-button>
                </div>
              </el-form-item>
              <el-form-item class="flow-password" prop="password">
                <el-input v-model="form.password" placeholder="密码" :type="syssee ? 'text' : 'password'"
                          :class="{password: form.password && !syssee}">
                  <el-button slot="append" class="plain-button syssee" :icon="syssee ? 'fa-eye' : 'fa-eye-slash'"
                             @click="syssee = !syssee"></el-button>
                </el-input>
              </el-form-item>
              <template v-if="mode == 'login'">
                <div class="login-options">
                  <el-button class="switch-type">手机验证码登录</el-button>
                  <el-button class="forget-pass">忘记密码？</el-button>
                </div>
                <el-button class="submit" @click="login">登录</el-button>
                <div class="login-footer">
                  <span class="footer-text">
                    <el-button class="plain-button" @click="signupMode">新用户注册</el-button>
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
              </template>
              <template v-else>
                <el-form-item class="flow-nickname" prop="nickname">
                  <el-input v-model="form.nickname" placeholder="姓名" class="nickname"></el-input>
                </el-form-item>
                <el-button class="submit" @click="accept">注册</el-button>
                <div class="login-footer">
                  <div class="left">
                    <span class="footer-text">注册即代表同意</span>
                    <span class="footer-text">
                        <el-button class="plain-button" @click="close">《知书协议》</el-button>
                      </span>
                  </div>
                  <div class="right">
                    <span class="footer-text">已有账号?</span>
                    <span class="footer-text">
                        <el-button class="switch-type" @click="loginMode">登录</el-button>
                      </span>
                  </div>
                </div>
              </template>
            </div>
          </el-form>
          <el-form ref="captchaForm" class="login-content accept-content" :rules="rules" :model="form" v-else>
            <div class="accept-container">
              <el-button class="plain-button backButton" icon="arrow-left" @click="acceptCaptcha = false"></el-button>
              <div class="accept-header">
                <div class="accept-title">{{header.accept.title}}</div>
                <div class="accept-subtitle">{{header.accept.subtitle}}</div>
              </div>
              <div class="login-flow">
                <el-form-item class="flow-account accept-account" prop="username">
                  <el-input :value="`${country.code}${form.username}`" class="account" disabled></el-input>
                </el-form-item>
                <el-form-item class="flow-nickname" prop="captcha">
                  <el-input v-model="form.captcha" placeholder="请输入 6 位短信验证码" class="nickname">
                    <span slot="append" class="await-time" v-if="awaitCaptcha">{{awaitCaptcha}} 秒后可重发</span>
                    <el-button slot="append" class="switch-type" @click="accept" v-else>重新获取短信验证码</el-button>
                  </el-input>
                </el-form-item>
                <div class="login-options">
                  <el-button class="forget-pass">更换登录方式</el-button>
                </div>
                <div class="accept-footer-container">
                  <el-button class="submit enter" @click="signup">进入知书</el-button>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </modal-backdrop>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import * as types from '@/store/mutation-types'
  import {login, isRegisterable, requireSMS, signup} from '@/api'
  import modalBackdrop from '@/components/ModalBackdrop'
  const countries = [
    {code: '+86', name: '中国', abbr: 'CN'},
    {code: '+1', name: '美国', abbr: 'US'},
    {code: '+81', name: '日本', abbr: 'JP'},
    {code: '+886', name: '中国台湾', abbr: 'TW'}
  ];
  const header = {
    login: {
      title: '登录知书',
      subtitle: '获取来自世界的知识和力量'
    },
    signup: {
      title: '加入知书',
      subtitle: '与世界探讨知识的绚丽多彩'
    },
    accept: {
      title: '验证手机',
      subtitle: '请输入你收到的 6 位数验证码'
    }
  };
  export default {
    name: 'login-card',
    data () {
      return {
        visible: false,
        mode: 'login',
        header,
        form: {
          username: '',
          password: ''
        },
        syssee: false,
        registerable: true,
        acceptCaptcha: false,
        awaitCaptcha: 0,
        country: {code: '+86', name: '中国'},
        countries,
        rules: {
          username: [
            {required: true, message: '请输入手机号', trigger: 'blur'},
            {pattern: /^[0-9]{11}$/, message: '请输入正确长度的手机号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 8, max: 20, message: '请输入8-20位密码', trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '请输入姓名', trigger: 'blur'},
            {max: 20, message: '名字不能超过20位哦', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {max: 6, message: '请输入 6 位验证码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapMutations('user', [types.SET_USER]),
      open () {
        this.visible = true;
      },
      close () {
        this.visible = false;
      },
      loginMode () {
        this.mode = 'login';
      },
      signupMode () {
        this.mode = 'signup';
      },
      async login () {
        this.$refs.loginForm.validate(valid => {
          if (!valid) throw new Error('login form not validated');
        });
        let user = await login(this.requestForm);
        this[types.SET_USER](user);
        this.$emit('logined');
        this.close();
      },
      async isRegisted () {
        try {
          await isRegisterable(this.requestForm);
        } catch (e) {
          this.registerable = false;
          throw e;
        }
      },
      async accept () {
        if (!this.acceptCaptcha) {
          this.$refs.loginForm.validate(valid => {
            if (!valid) throw new Error('captcha form not validated');
          });
          await this.isRegisted(this.requestForm);
        }
        requireSMS(this.requestForm);
        this.acceptCaptcha = true;
        this.awaitCaptcha = 59;
        let timeout = setInterval(() => {
          if (this.awaitCaptcha <= 0) {
            clearInterval(timeout);
          } else {
            this.awaitCaptcha--;
          }
        }, 1000);
      },
      async signup () {
        this.$refs.captchaForm.validate(valid => {
          if (!valid) throw new Error('signup form not validated');
        });
        let user = await signup(this.requestForm);
        this[types.SET_USER](user);
        this.$emit('logined');
        this.close();
      }
    },
    computed: {
      prefix: {
        get () {
          return JSON.stringify(this.country);
        },
        set (value) {
          this.country = JSON.parse(value);
        }
      },
      prefixWidth () {
        const wordWidth = 16;
        let {name, code} = this.country;
        return name.length * wordWidth + code.length * wordWidth / 2 + 16
      },
      fullaccount () {
        return `${this.country.code}${this.form.username}`
      },
      requestForm () {
        return {
          ...this.form,
          username: this.fullaccount
        }
      }
    },
    components: {modalBackdrop}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './login-card'
  @import './signup-card'
</style>
