<template>
  <div class="library">
    <header>
      <div class="back" @click="back">
        <i class="el-icon-fa-angle-left"></i><span>返回</span>
      </div>
      <div class="title">
        <i class="el-icon-fa-cloud-upload"></i>
        <span>分享中心</span>
      </div>
    </header>
    <box-card class="file-list" title="上传并分享" noPadding>
      <upload-box v-show="!fileList.length" ref="uploader"
                  :fileList="fileList"
                  :updateFiles="commitFiles">
      </upload-box>
      <div class="file-item" v-for="(file, index) in fileList"
           :key="`${file.name}_${index}`">
        <div class="file-info">
          <figure class="file">
            <img :src="fileIcon[file.raw.extension]" alt="format"/>
            <figcaption class="description">
              <div class="name">原始名：{{file.name}}</div>
              <div class="attribute">上传成功，共{{file.pageInfo && file.pageInfo.pageCount}}页</div>
            </figcaption>
          </figure>
          <div class="share-name">
            <span class="input-tip">分享名称</span>
            <el-input class="input" v-model="file.share.rename"></el-input>
          </div>
          <footer class="footer">
            <el-button class="footer-button" type="primary" @click="shareFile(file)">分 享</el-button>
            <el-button class="footer-button" @click="deleteFile(file)">删 除</el-button>
          </footer>
        </div>
        <div class="file-tags">
          <span class="tag-tip">请指定文档所属的 学校科目 或 专题</span>
          <div>
            <span class="input-tip">学校学院</span>
            <el-input class="input" v-model="file.share.institute"></el-input>
          </div>
          <div>
            <span class="input-tip">适用年级</span>
            <el-input class="input" v-model="file.share.semester"></el-input>
          </div>
          <div>
            <span class="input-tip">专业科目</span>
            <el-input class="input" v-model="file.share.major"></el-input>
          </div>
          <div>
            <span class="input-tip">指定专题</span>
            <el-input class="input" v-model="file.share.subject"></el-input>
          </div>
        </div>
      </div>
    </box-card>
    <box-card class="documents" title="分享记录">
      <el-menu :default-active="docsType" class="selector-tabs" mode="horizontal" @select="changeDocsType">
        <el-menu-item index="ratified" class="selector-item">已审核 (0)</el-menu-item>
        <el-menu-item index="to-ratify" class="selector-item">待审核 (0)</el-menu-item>
      </el-menu>
      <div class="empty-tip">暂时没有文档记录</div>
    </box-card>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { icons } from '@/assets/img/print'
  import * as types from '@/store/mutation-types'
  import boxCard from '$@/Stateless/BoxCard/index'
  import uploadBox from '$@/Business/UploadBox'

  export default {
    name: 'share-view',
    components: { boxCard, uploadBox },
    props: {},
    data () {
      return {
        docsType: 'ratified',
        fileIcon: icons,
      }
    },
    computed: {
      ...mapState('share', ['fileList']),
    },
    watch: {},
    mounted () {},
    methods: {
      ...mapMutations('share', {
        commitFiles: types.UPDATE_FILES
      }),
      back () {
        this.$router.back()
      },
      async changeDocsType (type) {
        console.log('docs type', type)
      },
      shareFile (file) {
        console.log(file.raw.md5)
        console.log(file.share)
        this.deleteFile(file)
      },
      deleteFile (file) {
        this.$refs.uploader.transmitRemove(file)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./share-view"
</style>
