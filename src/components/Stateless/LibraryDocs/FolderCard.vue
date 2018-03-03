<template>
  <doc-item-card :iconURL="folderIcon" :uid="uid">
    <template slot="count">{{count}} 个文件</template>
    <template slot="doc-name">{{name}}</template>
    <template slot="user">{{nickname}}</template>
    <template slot="created">{{updated}}</template>
    <template slot="collected">{{collected}}</template>
    <template slot="reviews">
      <i class="el-icon-fa-folder-open-o"></i>
      浏览 {{view}}
    </template>
    <template slot="tips" v-if="tags && tags.length">
      <i class="el-icon-fa-tag"></i>
      {{tags.join(' - ')}}
    </template>
  </doc-item-card>
</template>

<script>
  import { collectionFolder } from '@/assets/img/print'
  import docItemCard from './DocItemCard'
  import { formatDate } from '@/utils/format'

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
        id, name, tags,
        updated, count,
        collected, view,
        uploader: { uid, nickname }
      } = this.docItem
      return {
        id,
        name,
        tags,
        updated: formatDate(updated),
        count,
        collected,
        view,
        uid,
        nickname: nickname || '匿名用户',
        folderIcon: collectionFolder
      }
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {}
  }
</script>
