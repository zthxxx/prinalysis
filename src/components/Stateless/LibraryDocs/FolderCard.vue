<template>
  <doc-item-card :iconURL="folderIcon">
    <template slot="count">{{count}} 个文件</template>
    <template slot="doc-name">{{name}}</template>
    <template slot="user">{{user}}</template>
    <template slot="created">{{updated}}</template>
    <template slot="collected">{{collected}}</template>
    <template slot="reviews">
      <i class="el-icon-fa-folder-open-o"></i>
      浏览 {{view}}
    </template>
    <template slot="tips">点击查看详情</template>
  </doc-item-card>
</template>

<script>
  import { collectionFolder } from '@/assets/img/print'
  import docItemCard from './DocItemCard'
  import { formatDate } from '@/utils/tools'

  export default {
    name: 'folder-card',
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
        updated, count,
        collected, view,
        uid, user
      } = this.docItem
      return {
        id,
        name,
        updated: formatDate(updated),
        count,
        collected,
        view,
        uid,
        user: user || '匿名用户',
        folderIcon: collectionFolder
      }
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {}
  }
</script>
