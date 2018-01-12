<template>
  <doc-item-card :iconURL="fileIcon[format]">
    <template slot="count">{{pages}} 页</template>
    <template slot="doc-name">{{name}}</template>
    <template slot="user">{{user}}</template>
    <template slot="created">{{created}}</template>
    <template slot="collected">{{collected}}</template>
    <template slot="reviews">
      <i class="el-icon-fa-print"></i>
      打印 {{printed}}
    </template>
    <template slot="tips">点击查看详情</template>
  </doc-item-card>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { icons } from '@/assets/img/print'
  import docItemCard from './DocItemCard'
  import { formatDate } from '@/utils/tools'
  import * as types from '@/store/mutation-types'
  import { getPage } from '@/api'

  export default {
    name: 'file-card',
    components: { docItemCard },
    props: {
      docItem: {
        type: Object,
        required: true
      }
    },
    data () {
      let {
        id, name,
        created, pages, format,
        collected, printed,
        uid, user
      } = this.docItem
      let { doc, ppt, xls, pdf } = icons
      return {
        id,
        name,
        created: formatDate(created),
        pages,
        format,
        collected,
        printed,
        uid,
        user: user || '匿名用户',
        fileIcon: {
          doc, docx: doc,
          ppt, pptx: ppt,
          xls, xlsx: xls,
          pdf
        }
      }
    },
    computed: {
      ...mapState('print', ['fileList']),
    },
    watch: {},
    mounted () {},
    methods: {
      ...mapMutations('print', {
        commitFiles: types.UPDATE_FILES
      }),
      async creatFile () {
        let file = {
          name: this.name,
          raw: { md5: this.id },
          pageInfo: await getPage({ md5: this.id, name: this.name }),
          uid: Date.now() + this.id + this.fileList.length,
          status: 'success'
        }
        return file
      },
      async pushFile () {
        let file = await this.creatFile()
        this.fileList.push(file)
        this.commitFiles(this.fileList)
      }
    }
  }
</script>
