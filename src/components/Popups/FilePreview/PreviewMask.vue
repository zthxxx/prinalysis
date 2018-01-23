<template>
  <modal-backdrop>
    <filePageBox :fetchPage="fetchPage"
                 :isMono="isMono" :total="total"
                 @current="setCurrent"></filePageBox>
    <div class="control">
      <print-file-item class="print-file-item"
                       :price="price"
                       :file="file"
                       :preSetting="file.print"
                       @update="update">
        <div slot="control">
            <span>
              <span class="page-panel">第<span class="count">{{current}}</span>面</span>
              <div class="tip">每份{{papers}}张纸</div>
              <div class="tip">{{copies}}份共{{copies * papers}}张纸</div>
            </span>
          <aside class="close">
            <i class="el-icon-fa-compress close-btn" @click="close"></i>
          </aside>
        </div>
      </print-file-item>
    </div>
    <footer class="pagination">
      <div class="panel">{{current}} / {{total}}</div>
    </footer>
  </modal-backdrop>
</template>

<script>
  import _ from 'lodash'
  import modalBackdrop from '$@/Stateless/ModalBackdrop'
  import printFileItem from '$@/UI/PrintFileItem'
  import filePageBox from '$@/UI/FilePageBox'
  import { getPreview } from '@/api'

  export default {
    name: 'preview-mask',
    components: { modalBackdrop, printFileItem, filePageBox },
    props: {
      price: {
        type: null,
        default: null
      },
      file: {
        type: null,
        required: true,
        default: null
      },
      update: {
        type: Function,
        default: () => {
        }
      }
    },
    data () {
      let md5 = this.file.raw.md5
      let { size, row, col } = this.file.print
      return {
        current: 1,
        preset: {
          md5,
          size, row, col
        }
      }
    },
    computed: {
      isMono () {
        return this.file.print.color === 'mono'
      },
      total () {
        let { endPage, startPage, row, col } = this.file.print
        let layouts = row * col
        return Math.ceil((endPage - startPage + 1) / layouts)
      },
      papers () {
        let { side } = this.file.print
        return Math.ceil(this.total / side)
      },
      copies () {
        return this.file.print.copies
      },
      fetchPage () {
        let preset = this.preset
        return page => getPreview({ page, ...preset, })
      },
    },
    watch: {
      file: {
        handler ({ raw: { md5 }, print: { size, row, col } }) {
          let fileSet = { md5, size, row, col }
          if (!_.isEqual(fileSet, this.preset)) {
            this.preset = fileSet
          }
        },
        deep: true
      }
    },
    mounted () {},
    methods: {
      close () {
        this.$emit('close')
      },
      setCurrent (page) {
        this.current = page
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './preview-mask'
</style>
