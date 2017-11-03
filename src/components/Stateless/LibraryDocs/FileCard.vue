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
  import { icons } from '@/assets/img/print';
  import docItemCard from './DocItemCard';
  import { formatDate } from '@/utils/tools';

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
      } = this.docItem;
      let { doc, ppt, xls, pdf } = icons;
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
      };
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {}
  };
</script>
