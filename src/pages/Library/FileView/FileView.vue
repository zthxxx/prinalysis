<template>
  <div class="library">
    <fileViewHeader :file="file || undefined"></fileViewHeader>
    <article class="pages"></article>
    <fileViewSidebar class="sidebar"
                     :fileID="fileID"
                     :file="file || undefined"
                     :page="page">
    </fileViewSidebar>
  </div>
</template>

<script>
  import spinDot from '$@/Stateless/SpinDot'
  import fileViewHeader from '$@/UI/FileViewHeader'
  import fileViewSidebar from '$@/Business/FileViewSidebar'
  import { getFileInfo } from '@/api'

  export default {
    name: 'file-view',
    components: { spinDot, fileViewHeader, fileViewSidebar },
    props: {},
    data () {
      return {
        fileID: this.$route.params.fileID,
        file: null,
        page: 1
      }
    },
    computed: {},
    watch: {},
    async mounted () {
      this.file = await getFileInfo(this.fileID)
    },
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./file-view"
</style>
