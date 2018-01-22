<template>
  <header>
    <div class="left-part">
      <div class="back" @click="back"><i class="el-icon-fa-chevron-left"></i> 返回</div>
      <div class="title">
        <figure class="file">
          <img :src="fileIcon[file.format]" alt="format"/>
          <figcaption class="description">
            <div class="name">{{file.name}}</div>
            <div class="attribute">
              <i class="el-icon-fa-bars"></i>
              <span class="category">{{file.institute}} - {{file.subject}}</span>
              <span class="reading">{{file.viewed}} 次阅读</span>
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
    <div class="right-part">
      <figure class="user" v-if="file.uploader" @click="uploader">
        <img :src="file.uploader.avatar" alt="avatar"/>
        <figcaption class="description">
          <div class="name">{{file.uploader.nickname}}</div>
          <div class="time">分享于 {{upDate}}</div>
        </figcaption>
      </figure>
    </div>
  </header>
</template>

<script>
  import { icons } from '@/assets/img/print'
  import { formatDate } from '@/utils/format'


  export default {
    name: 'file-view-header',
    components: {},
    props: {
      file: {
        type: Object,
        default: () => ({
          name: '（加载中 ...）',
          format: 'doc',
          institute: '-',
          subject: '-',
          viewed: 0
        })
      }
    },
    data () {
      return {
        fileIcon: icons
      }
    },
    computed: {
      upDate () {
        return this.file && formatDate(this.file.upTime)
      }
    },
    watch: {},
    mounted () {},
    methods: {
      back () {
        this.$router.push({ name: 'library' })
      },
      uploader () {
        let { uid } = this.file.uploader
        console.log(uid)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./file-view-header"
</style>
