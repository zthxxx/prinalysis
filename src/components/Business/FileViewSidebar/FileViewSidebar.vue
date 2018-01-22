<template>
  <aside class="sidebar">
    <div class="operate" v-if="!commentExpanded">
      <header class="title">第 &nbsp;<span>{{page}}/{{file.pageCount}}</span>&nbsp; 页</header>
      <div class="controller">
        <button class="control" @click="printFile">
          <div class="icon"><i class="el-icon-fa-print"></i></div>
          <div class="description">打印 {{file.printed}}</div>
        </button>
        <button class="control" @click="pushFile">
          <div class="icon"><i class="el-icon-fa-shopping-cart"></i></div>
          <div class="description">加入打印队列</div>
        </button>
        <button class="control">
          <div class="icon"><i class="el-icon-fa-bookmark-o"></i></div>
          <div class="description">收藏 {{file.collected}}</div>
        </button>
        <a class="control" v-if="file.download.enable" :href="file.download.url" target="_blank">
          <div class="icon"><i class="el-icon-fa-cloud-download"></i></div>
          <div class="description">下载</div>
        </a>
        <button class="control disable" v-else>
          <div class="icon"><i class="el-icon-fa-cloud-download"></i></div>
          <div class="description">下载</div>
        </button>
      </div>
    </div>
    <div class="folder" v-if="!commentExpanded">
      <header class="title">包含该文章的精选集</header>
      <div class="folder-list">
        <figure class="folder-item" v-for="folder of folders" :key="folder.id"
                @click="viewFolder(folder.id)">
          <img :src="folderIcon" alt="folder"/>
          <figcaption class="description">
            <div class="folder-name">{{folder.name}}</div>
            <div class="user">
              <i class="el-icon-fa-user"></i>
              <span class="nickname">{{folder.user}}</span>
            </div>
          </figcaption>
        </figure>
        <span class="empty-tip" v-if="!folders.length"> 无 </span>
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
                @keyup.ctrl.enter.native="comment.length && submitComment()">
      </el-input>
      <footer class="tips">
        <span class="lens" :class="{ 'len-warn': comment.length > limitLen }">{{comment.length}} / {{limitLen}}</span>
        <span>按 Ctrl + Enter 键发送</span>
      </footer>
      <div class="comment-tip" v-if="!comments.length">欢迎发表评论</div>
      <div v-for="comment of comments" :key="comment.commentID">
        <figure class="comment-item">
          <img :src="comment.avatar" alt="avatar">
          <figcaption class="comment-content">
            <span class="discussant">{{comment.nickname}}:</span>
            <span class="content">{{comment.content}}</span>
          </figcaption>
          <footer><span class="time">{{formatTime(comment.created)}}</span></footer>
        </figure>
      </div>
    </div>
  </aside>
</template>

<script>
  import { mapState } from 'vuex'
  import { POPUP_LOGIN } from '$@/Popups'
  import { collectionFolder_at_0_dot_3x } from '@/assets/img/print'
  import { formatTime } from '@/utils/format'
  import { pushFileFormLibrary } from '@/utils/fileHelper'
  import { containedFolders, submitFileComment, loadFileComment } from '@/api'

  export default {
    name: 'file-view-sidebar',
    components: {},
    props: {
      fileID: {
        type: String,
        required: true
      },
      file: {
        type: Object,
        default () {
          return {
            pageCount: 1,
            printed: 0,
            collected: 0,
            download: { enable: false }
          }
        }
      },
      page: {
        type: Number,
        default: 1
      }
    },
    data () {
      return {
        folderIcon: collectionFolder_at_0_dot_3x,
        comment: '',
        comments: [],
        limitLen: 40,
        commentExpanded: false,
        folders: []
      }
    },
    computed: {
      ...mapState('user', ['user'])
    },
    watch: {},
    async mounted () {
      this.folders = await containedFolders(this.fileID)
      this.comments = await loadFileComment(this.fileID)
    },
    methods: {
      formatTime,
      async submitComment () {
        if (!this.user) {
          await this[POPUP_LOGIN]()
        }
        await submitFileComment({
          fileID: this.fileID,
          uid: this.user.uid,
          content: this.comment
        })
        this.comment = ''
        this.$notify.success({
          message: '评论发表成功'
        })
        this.comments = await loadFileComment(this.fileID)
      },
      viewFolder (folderID) {
        this.$router.push({ name: 'folder-view', params: { folderID } })
      },
      async pushFile (notify = true) {
        await pushFileFormLibrary({
          name: this.file.name,
          id: this.fileID,
          format: this.file.format
        }, notify)
      },
      async printFile () {
        await this.pushFile(false)
        this.$router.push({ name: 'print' })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./file-view-sidebar"
</style>
