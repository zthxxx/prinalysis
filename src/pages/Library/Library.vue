<template>
  <transition name="float-fade">
    <article class="library" key="library">
      <box-card>
        <div class="library-header">
          <header><i class="el-icon-fa-wpforms"></i>知书文库</header>
          <nav>
            <el-button class="nav-button" @click="viewPerson"
                       type="text" icon="fa-bookmark-o">我的收藏</el-button>
            <el-button class="nav-button" @click="viewShare"
                       type="text" icon="fa-cloud-upload">分享中心</el-button>
          </nav>
        </div>
      </box-card>
      <box-card class="seach">
        <el-menu :default-active="seachMethod" class="selector-tabs" mode="horizontal" @select="changeSeachMethod">
          <el-menu-item index="profession" class="selector-item">通过专业科目查找</el-menu-item>
          <el-menu-item index="thematic" class="selector-item">通过专题查找</el-menu-item>
        </el-menu>
        <component :is="seachMethod"
                   :defaultSearchs="defaultSearchs"
                   :optionalSearchs="optionalSearchs"
                   @search="onSearch">
        </component>
      </box-card>
      <box-card class="documents">
        <el-menu :default-active="docsType" class="selector-tabs" mode="horizontal" @select="changeDocsType">
          <el-menu-item index="files" class="selector-item">文档</el-menu-item>
          <el-menu-item index="folders" class="selector-item">精选集</el-menu-item>
        </el-menu>
        <template v-if="docs.length">
          <component :is="docsType"
                     v-for="docItem of docs" :key="docItem.id"
                     :docItem="docItem"
                     @click.native="view(docsType, docItem.id)">
          </component>
        </template>
        <div class="empty-tip" v-else>暂时搜索不到相关文档</div>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'
  import boxCard from '$@/Stateless/BoxCard'
  import professionSearch from '$@/UI/DocumentSearch/ProfessionSearch'
  import thematicSearch from '$@/UI/DocumentSearch/ThematicSearch'
  import fileCard from '$@/Stateless/LibraryDocs/FileCard'
  import folderCard from '$@/Stateless/LibraryDocs/FolderCard'
  import { POPUP_LOGIN } from '$@/Popups'
  import { getLibOptional, seekLibFiles, seekLibFolders } from '@/api'

  export default {
    name: 'library',
    components: {
      boxCard,
      profession: professionSearch,
      thematic: thematicSearch,
      files: fileCard,
      folders: folderCard
    },
    props: {},
    data () {
      return {
        seachMethod: '',
        docsType: 'files',
        defaultSearchs: {},
        optionalSearchs: [],
        lastSearchs: null,
        docs: []
      }
    },
    computed: {
      ...mapState('user', ['user']),
    },
    watch: {},
    created () {
      this.changeSeachMethod('profession')
    },
    methods: {
      async changeSeachMethod (method) {
        if (method === this.seachMethod) return
        let { defaults, optional } = await getLibOptional(method)
        this.defaultSearchs = defaults
        this.optionalSearchs = optional
        this.seachMethod = method
      },
      async changeDocsType (type) {
        if (type === this.docsType) return
        await this.onSearch(this.lastSearchs, type)
        this.docsType = type
      },
      async onSearch (payload, type = null) {
        this.lastSearchs = payload
        let searchMap = {
          files: this.searchFiles,
          folders: this.searchFloders
        }
        let searchs = {
          method: this.seachMethod,
          ...payload
        }

        await searchMap[type || this.docsType](searchs)
      },
      async searchFiles (payload) {
        let docFiles = await seekLibFiles(payload)
        this.docs = docFiles
      },
      async searchFloders (payload) {
        let docsFolders = await seekLibFolders(payload)
        this.docs = docsFolders
      },
      viewFile (fileID) {
        this.$router.push({ name: 'file-view', params: { fileID } })
      },
      viewFolder (folderID) {
        this.$router.push({ name: 'folder-view', params: { folderID } })
      },
      view (type, id) {
        const types = {
          files: this.viewFile,
          folders: this.viewFolder,
        }
        types[type](id)
      },
      async viewPerson () {
        if (!this.user) {
          await this[POPUP_LOGIN]()
        }
        let uid = this.user.uid
        this.$router.push({ name: 'person-view', params: { uid } })
      },
      async viewShare () {
        if (!this.user) {
          await this[POPUP_LOGIN]()
        }
        this.$router.push({ name: 'share-view' })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./library"
</style>
