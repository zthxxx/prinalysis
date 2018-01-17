<template>
  <div class="library">
    <fileViewHeader :file="file || undefined"></fileViewHeader>
    <article class="pages"></article>
    <aside class="sidebar">
      <div class="operate" v-if="!commentExpanded">
        <header class="title">第 &nbsp;<span>1/4</span>&nbsp; 页</header>
        <div class="controller">
          <button class="control">
            <div class="icon"><i class="el-icon-fa-print"></i></div>
            <div class="description">打印 3</div>
          </button>
          <button class="control">
            <div class="icon"><i class="el-icon-fa-shopping-cart"></i></div>
            <div class="description">加入打印队列</div>
          </button>
          <button class="control">
            <div class="icon"><i class="el-icon-fa-bookmark-o"></i></div>
            <div class="description">收藏 4</div>
          </button>
          <button class="control">
            <div class="icon"><i class="el-icon-fa-cloud-download"></i></div>
            <div class="description">下载</div>
          </button>
        </div>
      </div>
      <div class="folder" v-if="!commentExpanded">
        <header class="title">包含该文章的精选集</header>
        <div class="folder-list">
          <!--<span class="empty-tip"> 无 </span>-->
          <figure class="folder-item">
            <img :src="folderIcon" alt="folder"/>
            <figcaption class="description">
              <div class="folder-name">射惠主义精选集</div>
              <div class="user">
                <i class="el-icon-fa-user"></i>
                <span class="nickname">加藤惠</span>
              </div>
            </figcaption>
          </figure>
          <figure class="folder-item">
            <img :src="folderIcon" alt="folder"/>
            <figcaption class="description">
              <div class="folder-name">射惠主义精选集</div>
              <div class="user">
                <i class="el-icon-fa-user"></i>
                <span class="nickname">加藤惠</span>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
      <div class="comment">
        <header class="title" @click="commentExpanded = !commentExpanded">
          <span>文档讨论</span>
          <span class="expand" v-if="commentExpanded"><i class="el-icon-fa-arrow-down"></i>收起</span>
          <span class="expand" v-else><i class="el-icon-fa-arrow-up"></i>展开</span>
        </header>
        <el-input class="comment-input"
                  type="textarea" :rows="3"
                  placeholder="请输入内容"
                  v-model="comment"
                  @keyup.ctrl.enter.exact.native="submitComment">
        </el-input>
        <footer class="tips">
          <span class="lens" :class="{ 'len-warn': comment.length > limitLen }">{{comment.length}} / {{limitLen}}</span>
          <span>按 Ctrl + Enter 键发送</span>
        </footer>
        <div class="comment-item">欢迎发表评论</div>
      </div>
    </aside>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import spinDot from '$@/Stateless/SpinDot'
  import fileViewHeader from '$@/UI/FileViewHeader'
  import { collectionFolder_at_0_dot_3x } from '@/assets/img/print'
  import { getFileInfo } from '@/api'

  export default {
    name: 'file-view',
    components: { fileViewHeader, spinDot },
    props: {},
    data () {
      return {
        fileID: this.$route.params.fileID,
        file: null,
        folderIcon: collectionFolder_at_0_dot_3x,
        comment: '',
        limitLen: 40,
        commentExpanded: false
      }
    },
    computed: {
      ...mapState('user', ['user']),
    },
    watch: {},
    async mounted () {
      this.file = await getFileInfo(this.fileID)
    },
    methods: {
      back () {
        console.log('back')
        this.$router.push({ name: 'library' })
      },
      submitComment () {
        console.log(this.comment)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./file-view"
</style>
