<template>
  <transition name="float-fade">
    <div>
      <header class="user-header">
        <figure class="avatar" @click="avatarAdjust = true">
          <img :src="modify.avatar" alt="avatar"/>
          <figcaption class="tips">
            <span>点击这里更新头像</span>
          </figcaption>
        </figure>
        <avatar-crop v-model="avatarAdjust" :width="200" :height="200"
                     img-format="png" @crop-success="croped">
        </avatar-crop>
      </header>
      <el-form class="user-info" ref="infoForm" :model="modify" :rules="rules" label-width="100px">
        <el-form-item class="row" label="收件姓名" prop="nickname">
          <el-input class="item-input" v-model="modify.nickname"></el-input>
        </el-form-item>
        <el-form-item class="row" label="手机号" prop="username">
          <el-input class="item-input" v-model="modify.username" disabled></el-input>
        </el-form-item>
        <el-form-item class="row" label="默认收货地址">
          <el-input class="item-input" v-model="modify.address"></el-input>
        </el-form-item>
      </el-form>
      <footer class="footer">
        <el-button class="footer-button" type="primary" @click="update">确定</el-button>
        <el-button class="footer-button" @click="back">返回</el-button>
      </footer>
      <span class="division">修改密码</span>
      <el-form class="pass-form" ref="passForm" :model="passwords" :rules="passRules" label-width="100px">
        <el-form-item class="row" label="原密码" prop="origin">
          <el-input class="item-input" v-model="passwords.origin" type="password"></el-input>
        </el-form-item>
        <el-form-item class="row" label="新密码" prop="news">
          <el-input class="item-input" v-model="passwords.news" :type="syssee ? 'text' : 'password'">
            <el-button slot="append" class="plain-button syssee" :icon="syssee ? 'fa-eye' : 'fa-eye-slash'"
                       @click="syssee = !syssee"></el-button>
          </el-input>
        </el-form-item>
        <el-button class="footer-button" type="danger" @click="repassworded">确认修改密码</el-button>
      </el-form>
    </div>
  </transition>
</template>

<script>
  import avatarCrop from 'vue-image-crop-upload'
  import { updateUserInfo } from '@/api'
  import * as types from '@/store/mutation-types'
  import { mapModel, userCheckRules } from '@/utils/tools'

  export default {
    name: 'modify-info',
    header: '修改信息',
    components: { avatarCrop },
    props: {},
    data () {
      return {
        avatarAdjust: false,
        imgDataUrl: '',
        modify: {
          username: '',
          nickname: '',
          avatar: '',
          address: ''
        },
        passwords: {
          origin: '',
          news: ''
        },
        syssee: false,
        rules: userCheckRules,
        passRules: {
          origin: userCheckRules.password,
          news: userCheckRules.password
        }
      }
    },
    computed: {
      ...mapModel('user', { user: types.SET_USER })
    },
    watch: {},
    mounted () {
      Object.assign(this.modify, this.user)
    },
    methods: {
      async update () {
        this.$refs.infoForm.validate(valid => {
          if (!valid) throw new Error('user info form not validated')
        })
        let { nickname, avatar, address } = this.modify
        if (avatar === this.user.avatar) avatar = ''
        let user = await updateUserInfo({ nickname, avatar, address })
        if (user) {
          this.user = user
          this.back()
        }
      },
      async repassworded () {
        this.$refs.passForm.validate(valid => {
          if (!valid) throw new Error('user info form not validated')
        })
        let { origin, news } = this.passwords
        console.log({ origin, news })
      },
      back () {
        this.$router.push({ name: 'person-info' })
      },
      croped (imageData) {
        this.modify.avatar = imageData
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './modify-info'
</style>
