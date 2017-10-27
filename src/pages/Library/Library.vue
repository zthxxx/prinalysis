<template>
  <transition name="float-fade">
    <article class="library" key="library">
      <box-card>
        <div class="library-header">
          <header><i class="el-icon-fa-wpforms"></i>知书文库</header>
          <nav>
            <el-button class="nav-button" type="text" icon="fa-bookmark-o">我的收藏</el-button>
            <el-button class="nav-button" type="text" icon="fa-cloud-upload">分享中心</el-button>
          </nav>
        </div>
      </box-card>
      <box-card class="seach" title="通过专业科目查找">
      </box-card>
      <box-card class="documents" title="文档">
      </box-card>
    </article>
  </transition>
</template>

<script>
  import boxCard from '$@/Stateless/BoxCard';
  export default {
    name: 'library',
    components: { boxCard },
    props: {},
    data () {
      return {};
    },
    computed: {},
    watch: {},
    mounted: {},
    methods: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./library"
</style>
