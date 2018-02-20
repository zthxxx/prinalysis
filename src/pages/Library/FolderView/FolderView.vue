<template>
  <div class="library">
  <folder-view-header :folder="folder || undefined"></folder-view-header>
  <box-card class="documents">
    <file-card v-for="file of folder.files" :key="file.id"
               :docItem="file"
               @click.native="viewFile(file.id)">
    </file-card>
    <div class="empty-tip" v-if="!folder.files.length">该精选集暂时没有相关文档</div>
  </box-card>
  </div>
</template>

<script>
  import boxCard from '$@/Stateless/BoxCard'
  import folderViewHeader from '$@/UI/FolderViewHeader'
  import fileCard from '$@/Stateless/LibraryDocs/FileCard'
  import { getFolderInfo } from '@/api'

  export default {
    name: 'folder-view',
    components: { boxCard, folderViewHeader, fileCard },
    props: {},
    data () {
      return {
        folderID: this.$route.params.folderID,
        folder: null
      }
    },
    computed: {},
    watch: {},
    async mounted () {
      this.folder = await getFolderInfo(this.folderID)
    },
    methods: {
      viewFile (fileID) {
        this.$router.push({ name: 'file-view', params: { fileID } })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./folder-view"
</style>
