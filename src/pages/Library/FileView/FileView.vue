<template>
  <div class="library">
    <fileViewHeader :file="file || undefined"></fileViewHeader>
    <article class="pages" @scroll="onscroll">
      <figure v-for="(img, index) in pagepics" :key="index + img">
        <img :src="img" @load="loadimg">
      </figure>
      <footer class="last-tip">
        <template v-if="loadEnd && !loading">已到达最后一面，共 {{total}} 面</template>
        <div class="loading" v-else>
          <spinDot :size="36"></spinDot>
          <div class="text">拼命加载中...</div>
        </div>
      </footer>
    </article>
    <aside class="sidebar"></aside>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import spinDot from '$@/Stateless/SpinDot'
  import fileViewHeader from '$@/UI/FileViewHeader'
  import { getFileInfo, getPreview } from '@/api'
  import { throttle } from '@/utils/tools'

  export default {
    name: 'file-view',
    components: { fileViewHeader, spinDot },
    props: {},
    data () {
      return {
        fileID: this.$route.params.fileID,
        file: null,
        pagepics: [],
        onscroll: throttle(this.handleScroll, 300),
        currentPage: 1,
        loading: false,
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
