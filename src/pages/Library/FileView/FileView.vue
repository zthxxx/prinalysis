<template>
  <div>
    <fileViewHeader :file="file || undefined"></fileViewHeader>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import fileViewHeader from '$@/UI/FileViewHeader'
  import { getFileInfo } from '@/api'

  export default {
    name: 'file-view',
    components: { fileViewHeader },
    props: {},
    data () {
      return {
        fileID: this.$route.params.fileID,
        file: null
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./file-view"
</style>
