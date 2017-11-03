<template>
  <section class="file-card">
    <div class="file-box">
      <figure class="format">
        <img class="file-icon" :src="folderIcon" />
        <figcaption class="pages">{{count}} 个文件</figcaption>
      </figure>
      <div class="descripte">
        <header class="file-name">{{name}}</header>
        <div>
          <span class="uploader">
            <i class="el-icon-fa-user"></i>
            {{user}}
          </span>
          <span class="created">{{updated}}</span>
        </div>
        <span class="collected">
          <i class="el-icon-fa-bookmark-o"></i>
          收藏 {{collected}}
        </span>
        <span class="printed">
          <i class="el-icon-fa-folder-open-o"></i>
          浏览 {{view}}
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
  import { collectionFolder } from '@/assets/img/print';
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
        updated, count,
        collected, view,
        uid, user
      } = this.docItem;
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
