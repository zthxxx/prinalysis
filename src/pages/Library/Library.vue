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
      <box-card class="seach">
        <el-menu :default-active="seachMethod" class="selector-tabs" mode="horizontal" @select="changeSeachMethod">
          <el-menu-item index="profession" class="selector-item">通过专业科目查找</el-menu-item>
          <el-menu-item index="thematic" class="selector-item">通过专题查找</el-menu-item>
        </el-menu>
        <component :is="seachMethod"
                   :defaultSearchs="defaultSearchs"
                   :optionalSearchs="optionalSearchs"
                   @search="onSearch">
        </component>
      </box-card>
      <box-card class="documents">
        <el-menu :default-active="seachType" class="selector-tabs" mode="horizontal" @select="changeSeachType">
          <el-menu-item index="file" class="selector-item">文档</el-menu-item>
          <el-menu-item index="folder" class="selector-item">精选集</el-menu-item>
        </el-menu>
        <div class="empty-tip">暂时搜索不到相关文档</div>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import boxCard from '$@/Stateless/BoxCard';
  import professionSearch from '$@/UI/DocumentSearch/ProfessionSearch';
  import thematicSearch from '$@/UI/DocumentSearch/ThematicSearch';
  import { getLibOptional } from '@/api';

  export default {
    name: 'library',
    components: {
      boxCard,
      profession: professionSearch,
      thematic: thematicSearch
    },
    props: {},
    data () {
      return {
        seachMethod: 'profession',
        seachType: 'file',
        defaultSearchs: {},
        optionalSearchs: []
      };
    },
    computed: {},
    watch: {},
    created () {
      this.changeSeachMethod(this.seachMethod);
    },
    methods: {
      async changeSeachMethod (method) {
        let { defaults, optional } = await getLibOptional(method);
        this.defaultSearchs = defaults;
        this.optionalSearchs = optional;
        this.seachMethod = method;
      },
      changeSeachType (type) {
        this.seachType = type;
      },
      onSearch (payload) {
        console.log(payload);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./library"
</style>
