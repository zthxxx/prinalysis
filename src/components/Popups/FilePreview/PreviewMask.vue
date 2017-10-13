<template>
  <modal-backdrop>
    <div class="center">
      <div class="page" ref="pagebox" @scroll="onscroll">
        <div class="page-list" ref="pages">
          <div v-for="(img, index) in pagepics" :key="index + img">
            <img :src="img" :class="{gray: isMono}" @load="loadimg">
          </div>
          <div class="last-tip">
            <template v-if="loadEnd && !loading">已到达最后一面，每份需打印{{copies * total}}面</template>
            <div class="loading" v-else>
              <spinDot :size="36"></spinDot>
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
                           :price="price"
                           :file="file"
                           :preSetting="file.print"
                           @update="update">
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
  </modal-backdrop>
</template>

<script>
  import modalBackdrop from '@/components/ModalBackdrop';
  import printFileItem from '@/components/PrintFileItem';
  import spinDot from '@/components/SpinDot';
  import { getPreview } from '@/api';
  import { throttle } from '@/utils/tools';

  export default {
    name: 'preview-mask',
    components: { modalBackdrop, printFileItem, spinDot },
    props: {
      price: {
        type: null,
        default: null
      },
      file: {
        type: null,
        default: null
      },
      update: {
        type: Function,
        default: () => {
        }
      }
    },
    data () {
      return {
        pagepics: [],
        onscroll: throttle(this.handleScroll, 300),
        currentPage: 1,
        loading: false,
        precolor: this.file.print.color,
        precopies: this.file.print.copies,
        preside: this.file.print.side
      };
    },
    computed: {
      isMono () {
        return this.file.print.color === 'mono';
      },
      total () {
        let { endPage, startPage, row, col } = this.file.print;
        let layouts = row * col;
        return Math.ceil((endPage - startPage + 1) / layouts);
      },
      loadEnd () {
        return this.pagepics.length >= this.total;
      },
      papers () {
        let { side } = this.file.print;
        return Math.ceil(this.total / side);
      },
      copies () {
        return this.file.print.copies;
      }
    },
    watch: {
      file: {
        handler ({ print: { color, copies, side } }) {
          if (color === this.precolor && copies === this.precopies && side === this.preside) {
            console.warn('Update preview setting');
            this.pagepics = [];
            this.getpic(1);
            return;
          }
          this.precolor = color;
          this.precopies = copies;
          this.preside = side;
        },
        deep: true
      }
    },
    mounted () {
      this.getpic(1);
    },
    methods: {
      close () {
        this.$emit('close');
      },
      async getpic (page) {
        if (this.loading || this.loadEnd) return;
        this.loading = true;
        let { size, row, col } = this.file.print;
        let { img } = await getPreview({
          md5: this.file.raw.md5,
          page, size,
          row, col
        });
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
        if (this.currentPage !== current) this.currentPage = current;
        if (scrollTop >= buttomLimit && !this.loadEnd) {
          let next = pagesCount + 1;
          console.warn('next page', next);
          this.getpic(next);
        }
      },
      loadimg () {
        this.loading = false;
        if (!this.$refs.pagebox) return;
        let clientHeight = this.$refs.pagebox.clientHeight;
        let scrollHeight = this.$refs.pagebox.scrollHeight;
        if (scrollHeight <= clientHeight) {
          let pagesCount = this.pagepics.length;
          this.getpic(pagesCount + 1);
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './preview-mask'
</style>
