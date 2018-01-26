<template>
  <div class="library">
    <fileViewHeader :file="file || undefined"></fileViewHeader>
    <article class="page-content">
      <filePageBox v-if="preset"
                   :fetchPage="fetchPage"
                   :total="file.pageCount"
                   @current="setCurrent">
      </filePageBox>
    </article>
    <fileViewSidebar class="sidebar"
                     :fileID="fileID"
                     :file="file || undefined"
                     :page="page">
    </fileViewSidebar>
  </div>
</template>

<script>
  import filePageBox from '$@/UI/FilePageBox'
  import fileViewHeader from '$@/UI/FileViewHeader'
  import fileViewSidebar from '$@/Business/FileViewSidebar'
  import { getFileInfo, getPreview } from '@/api'

  export default {
    name: 'file-view',
    components: { fileViewHeader, filePageBox, fileViewSidebar },
    props: {},
    data () {
      return {
        fileID: this.$route.params.fileID,
        file: null,
        preset: null,
        page: 1
      }
    },
    computed: {
      fetchPage () {
        let preset = this.preset
        return page => getPreview({ page, ...preset, })
      }
    },
    watch: {},
    async mounted () {
      this.file = await getFileInfo(this.fileID)
      this.preset = {
        md5: this.fileID,
        size: 'A4',
        row: 1, col: 1
      }
    },
    methods: {
      setCurrent (page) {
        this.page = page
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./file-view"
</style>
