<template>
  <section class="file-card">
    <figure class="format">
      <img class="file-icon" :src="fileIcon[format]" />
      <figcaption class="pages">{{pages}} 页</figcaption>
    </figure>
    <div class="descripte">
      <header class="file-name">{{name}}</header>
      <div>
        <span class="uploader">
          <i class="el-icon-fa-user"></i>
          {{uploader}}
        </span>
        <span class="created">{{created}}</span>
      </div>
      <span class="collected">
        <i class="el-icon-fa-bookmark-o"></i>
        收藏 {{collected}}
      </span>
      <span class="printed">
        <i class="el-icon-fa-folder-open-o"></i>
        打印 {{printed}}
      </span>
    </div>
    <!--<footer>点击查看详情</footer>-->
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
        uid, uploader
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
        uploader,
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
  @import "./file-card"
</style>
