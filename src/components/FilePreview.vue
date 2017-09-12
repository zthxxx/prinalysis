<template>
  <transition name="fade">
    <div class="preview">
      <div class="center">
        <div class="page" ref="pagebox" @scroll="onscroll">
          <div class="page-list" ref="pages">
            <div v-for="img in pagepics">
              <img :src="img" :class="{gray: isMono}" @load="loadimg">
            </div>
            <div class="last-tip">
              <template v-if="loadEnd && !loading">已到达最后一面，每份需打印{{copies * total}}面</template>
              <div class="loading" v-else>
                <div class="spinning">
                  <span class="spin-dot"></span>
                </div>
                <div class="text">拼命加载中...</div>
              </div>
            </div>
          </div>
        </div>
        <div class="file">
          <div class="close">
            <div class="content">
              <i class="el-icon-fa-compress close-btn" @click="close"></i>
            </div>
          </div>
          <div class="file-setting">
            <print-file-item class="print-file-item"
                             :file="file"
                             :preSetting="file.print"
                             :price="price">
              <div slot="control">
                <div class="page-panel">第<span class="count">{{currentPage}}</span>面</div>
                <div class="tip">每份{{papers}}张纸</div>
                <div class="tip">{{copies}}份共{{copies * papers}}张纸</div>
              </div>
            </print-file-item>
          </div>
          <div class="pagination">
            <div class="panel">{{currentPage}} / {{total}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import printFileItem from './PrintFileItem'
  import {filePreview} from '@/api'
  import {throttle} from '@/utils/tools'
  export default {
    name: 'file-preview',
    props: {
      price: {
        required: true,
        default: null
      },
      file: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.getpic(1);
    },
    data () {
      return {
        pagepics: [],
        onscroll: throttle(this.handleScroll, 300),
        currentPage: 1,
        loading: false
      }
    },
    methods: {
      close () {
        this.$emit('close', false);
      },
      async getpic (page) {
        if (this.loading && this.loadEnd) return;
        let {size, color, row, col} = this.file.print;
        let {img} = await filePreview({
          md5: this.file.raw.md5,
          page,
          size, color,
          row, col
        });
        this.loading = true;
        this.pagepics.push(img);
      },
      calcCurrent (scroll, totalHeight, pagesCount) {
        pagesCount = this.loading ? pagesCount - 1 : pagesCount;
        scroll = scroll || 1;
        let current = scroll / totalHeight * pagesCount;
        return Math.ceil(current);
      },
      handleScroll () {
        let scrollTop = this.$refs.pagebox.scrollTop;
        let clientHeight = this.$refs.pagebox.clientHeight;
        let pagesHeight = this.$refs.pages.clientHeight;
        let pagesCount = this.pagepics.length;
        let buttomLimit = pagesHeight - clientHeight;
        let current = this.calcCurrent(scrollTop, pagesHeight, pagesCount);
        if (this.currentPage != current) this.currentPage = current;
        if (scrollTop >= buttomLimit && !this.loadEnd) {
          let next = pagesCount + 1;
          console.warn('next page', next);
          this.getpic(next);
        }
      },
      loadimg () {
        this.loading = false;
      }
    },
    computed: {
      isMono () {
        return this.file.print.color == 'mono';
      },
      total () {
        let {endPage, startPage, row, col} = this.file.print;
        let layouts = row * col;
        return Math.ceil((endPage - startPage + 1) / layouts);
      },
      loadEnd () {
        return this.pagepics.length >= this.total;
      },
      papers () {
        let {side} = this.file.print;
        return Math.ceil(this.total / side);
      },
      copies () {
        return this.file.print.copies;
      }
    },
    components: {printFileItem}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  @import '../style/_animate'
  .preview
    position: fixed
    display: flex
    left: 0
    top: 0
    width: 100%
    height: 100%
    justify-content: center
    align-items: center
    background-color: rgba(shallow-text-gray, .6)
    z-index: 2
    .center
      width: 90%
      height: 100%
      .page
        overflow-y: scroll
        text-align: center
        margin: 0 auto
        padding-left: 8px
        height: 100%
        scrollbar()
        .page-list
          margin: 0 auto
          margin-top: 126px
          img
            box-shadow: 0 0 10px 0 shallow-text-gray
            margin: 10px auto 0
            max-width: 98%
            min-width: 50%
            min-height: 80%
          .last-tip
            height: 80px
            font-size: 14px
            color: #ddd
            padding: 10px 0
            margin-bottom: 140px
      .loading
        width: 100%
        margin-top: 30px
        margin-bottom: 30px
        text-align: center
        .spinning
          opacity: 1;
          position: static
          visibility: visible
          .spin-dot
            position: relative
            display: inline-block
            vertical-align: middle
            text-align: center
            width: 36px
            height: 36px
            &:after, &:before
              content: ""
              display: block
              position: absolute
              top: 0
              left: 0
              bottom: 0
              right: 0
              border-radius: 50%
              background-color: #2db7f5
              opacity: .6
              animation: spin-bounce 2.4s infinite ease-in-out
            &:after
              animation-delay: -1.2s
        .text
          margin-top: 10px
          font-size: 16px
          color: #ddd
      .file
        position: fixed
        left: 0
        top: 10px
        width: 100%
        .close
          position: absolute
          left: 0
          top: 35px
          width: 100%
          .content
            width: 1120px
            text-align: right
            margin: 0 auto
            .close-btn
              border-radius: 30px
              height: 30px
              width: 30px
              line-height: 30px
              text-align: center
              font-size: 20px
              background-color: #fff
              cursor: pointer
              opacity: .9
              box-shadow: 0 0 12px 0 #999
              &:hover
                color: #fff
                background-color: dark-blue
                opacity: 1
                transition: all .2s ease-out
        .print-file-item
          box-shadow: 0 0 8px 0 #999
          .page-panel
            padding-top: 4px
            color: #069
            .count
              font-size: 18px
          .tip
            padding-top: 7%
            font-size: 12px
            color: #999
        .pagination
          position: fixed
          width: 100%
          bottom: 20px
          text-align: center
          .panel
            display: inline-block
            padding: 6px
            border-radius: 4px
            font-size: 12px
            color: #fff
            background-color: rgba(#000, .4)

</style>
