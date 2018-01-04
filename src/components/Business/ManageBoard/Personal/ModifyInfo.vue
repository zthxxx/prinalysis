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
      <div class="user-info">
        <div class="row">
          <span class="item-tips">昵称 / 收件姓名：</span>
          <span class="item"><el-input class="item-input" v-model="modify.nickname"></el-input></span>
        </div>
        <div class="row">
          <span class="item-tips">手机号：</span>
          <span class="item"><el-input class="item-input" v-model="modify.username" disabled></el-input></span>
        </div>
        <div class="row">
          <span class="item-tips">默认收货地址：</span>
          <span class="item"><el-input class="item-input" v-model="modify.address"></el-input></span>
        </div>
      </div>
      <footer class="footer">
        <el-button class="footer-button" type="primary" @click="update">确定</el-button>
        <el-button class="footer-button" @click="back">返回</el-button>
      </footer>
    </div>
  </transition>
</template>

<script>
  import avatarCrop from 'vue-image-crop-upload'
  import { updateUserInfo } from '@/api'
  import * as types from '@/store/mutation-types'
  import { mapModel } from '@/utils/tools'

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
        let { nickname, avatar, address } = this.modify
        if (avatar === this.user.avatar) avatar = ''
        let user = await updateUserInfo({ nickname, avatar, address })
        if (user) {
          this.user = user
          this.back()
        }
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
