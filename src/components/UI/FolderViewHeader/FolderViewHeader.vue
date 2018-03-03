<template>
  <div>
    <header>
      <div class="left-part">
        <div class="back" @click="back">
          <i class="el-icon-fa-angle-left"></i><span>返回</span>
        </div>
        <div class="title">
          <figure class="folder">
            <img :src="folderIcon" alt="folder"/>
            <figcaption class="description">
              <div class="name">
                <span class="type">精选集</span>
                <span class="text">{{folder.name}}</span>
              </div>
              <div class="attribute">
                <i class="el-icon-fa-bars"></i>
                <span class="intro">简介：{{folder.description || '无'}}</span>
                <span class="files">共 {{folder.files.length}} 个文件</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="right-part">
        <figure class="user" v-if="folder.uploader" @click="uploader">
          <img :src="folder.uploader.avatar" alt="avatar"/>
          <figcaption class="description">
            <div class="name">{{folder.uploader.nickname}}</div>
            <div class="time">分享于 {{upDate}}</div>
          </figcaption>
        </figure>
      </div>
    </header>
    <div class="brief">
      <div class="attribute">
        <i class="el-icon-fa-tag"></i>
        <span class="category">{{folder.tags.join(' - ') || '暂无标签'}}</span>
        <span class="reading"> {{folder.viewed}} 次阅读</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { collectionFolder_at_0_dot_3x as folderIcon } from '@/assets/img/print'
  import { formatDate } from '@/utils/format'


  export default {
    name: 'folder-view-header',
    components: {},
    props: {
      folder: {
        type: Object,
        default: () => ({
          name: '（加载中 ...）',
          description: '',
          tags: [],
          files: [],
          viewed: 0
        })
      }
    },
    data () {
      return {
        folderIcon: folderIcon
      }
    },
    computed: {
      upDate () {
        return this.folder && formatDate(this.folder.updated)
      }
    },
    watch: {},
    mounted () {},
    methods: {
      back () {
        this.$router.back()
      },
      uploader () {
        let { uid } = this.folder.uploader
        this.$router.push({ name: 'person-view', params: { uid } })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./folder-view-header"
</style>
