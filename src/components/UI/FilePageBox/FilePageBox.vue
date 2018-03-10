<template>
  <div class="page-box" ref="pagebox" @scroll="onScroll">
    <div class="page-list" ref="pages">
      <figure v-for="(img, index) in pagepics" :key="index + img">
        <img :src="img" :class="{gray: isMono}" @load="onLoadimg">
      </figure>
    </div>
    <footer class="last-tip" ref="footer">
      <template v-if="loadEnd && !loading">已到达最后一面</template>
      <div class="loading" v-else>
        <spinDot :size="36"></spinDot>
        <div class="text">拼命加载中...</div>
      </div>
    </footer>
  </div>
</template>

<script>
  import spinDot from '$@/Stateless/SpinDot'
  import { throttle } from '@/utils/tools'

  export default {
    name: 'file-page-box',
    components: { spinDot },
    props: {
      fetchPage: {
        type: Function,
        required: true
      },
      startPage: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        required: true,
        default: 0
      },
      isMono: {
        type: Boolean,
        default: false
      },
    },
    data () {
      return {
        pagepics: [],
        currentPage: 1,
        loading: false,
        onScroll: throttle(this.handleScroll, 300)
      }
    },
    computed: {
      loadEnd () {
        return this.pagepics.length >= this.total
      }
    },
    watch: {
      fetchPage: {
        handler () {
          this.pagepics = []
          this.setPagePic(1)
        },
        deep: true
      },
      total (total) {
        this.pagepics.splice(total)
      }
    },
    mounted () {
      this.setPagePic(1)
    },
    methods: {
      calcCurrent (scroll, totalHeight, pagesCount) {
        pagesCount = this.loading ? pagesCount - 1 : pagesCount
        scroll = scroll || 1
        let current = scroll / totalHeight * pagesCount
        return Math.ceil(current)
      },
      async setPagePic (page) {
        if (this.loading || this.loadEnd) return
        this.loading = true
        let { img } = await this.fetchPage(page)
        this.pagepics.push(img)
      },
      handleScroll () {
        let scrollTop = this.$refs.pagebox.scrollTop
        let clientHeight = this.$refs.pagebox.clientHeight
        let pagesHeight = this.$refs.pages.clientHeight
        let pagesCount = this.pagepics.length
        let buttomLimit = pagesHeight - clientHeight
        let current = this.calcCurrent(scrollTop, pagesHeight, pagesCount) || 1
        if (this.currentPage !== current) {
          this.currentPage = current
          this.$emit('current', this.currentPage)
        }
        if (scrollTop >= buttomLimit && !this.loadEnd) {
          let next = pagesCount + 1
          this.setPagePic(next)
        }
      },
      onLoadimg () {
        this.loading = false
        let clientHeight = this.$refs.pagebox.clientHeight
        let scrollHeight = this.$refs.pagebox.scrollHeight
        if (scrollHeight <= clientHeight) {
          let pagesCount = this.pagepics.length
          this.setPagePic(pagesCount + 1)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './file-page-box'
</style>
