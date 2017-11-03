<template>
  <section class="file-card">
    <div class="file-box">
      <figure class="format">
        <img class="file-icon" :src="fileIcon[format]" />
        <figcaption class="pages">{{pages}} 页</figcaption>
      </figure>
      <div class="descripte">
        <header class="file-name">{{name}}</header>
        <div>
          <span class="uploader">
            <i class="el-icon-fa-user"></i>
            {{user}}
          </span>
          <span class="created">{{created}}</span>
        </div>
        <span class="collected">
          <i class="el-icon-fa-bookmark-o"></i>
          收藏 {{collected}}
        </span>
        <span class="printed">
          <i class="el-icon-fa-print"></i>
          打印 {{printed}}
        </span>
      </div>
    </div>
    <footer>
      <span>
        <i class="el-icon-fa-list-ul"></i>&nbsp;
        点击查看详情
      </span>
    </footer>
  </section>
</template>

<script>
  import { icons } from '@/assets/img/print';
  import { formatDate } from '@/utils/tools';

  export default {
    name: 'file-card',
    components: {},
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
        name: name || '匿名用户',
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

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./library-docs-card"
</style>
