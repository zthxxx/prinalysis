<template>
  <div>
    <div class="table-line">
      <span class="select-title">专题分类</span>
      <el-menu class="select-radio" :default-active="category" mode="horizontal" @select="setCategory">
        <el-menu-item class="select-radio-item"
                      v-for="(value, name) in categories" :key="name"
                      :index="name">{{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">专题</span>
      <el-menu class="select-radio" :default-active="topic" mode="horizontal" @select="setTopic">
        <el-menu-item class="select-radio-item"
                      v-for="name of topics" :key="name"
                      :index="name">{{ name }}
        </el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">排序</span>
      <el-menu class="select-radio" :default-active="order" mode="horizontal" @select="setOrder">
        <el-menu-item index="COLLECTED" class="select-radio-item">收藏量</el-menu-item>
        <el-menu-item index="PRINT" class="select-radio-item">打印量</el-menu-item>
        <el-menu-item index="TIME" class="select-radio-item">上传时间</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { getFirstKey } from '@/utils/tools';

  export default {
    name: 'thematic-search',
    components: {},
    props: {
      defaultSearchs: {
        type: Object,
        required: false,
        default: () => ({})
      },
      optionalSearchs: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        categories: this.optionalSearchs,
        category: '',
        topics: [],
        topic: '',
        order: 'COLLECTED'
      };
    },
    computed: {},
    watch: {
      defaultSearchs: {
        handler () {
          this.setDefault();
        },
        deep: true
      }
    },
    created () {
      if (_.isEmpty(this.defaultSearchs)) {
        let category = getFirstKey(this.categories, this.category);
        this.setCategory(category);
        return;
      }
      this.setDefault();
    },
    methods: {
      setDefault () {
        let { category, topic, order } = this.defaultSearchs;
        this.topic = topic;
        this.order = order;
        this.setCategory(category);
      },
      async setCategory (category) {
        this.category = category;
        this.topics = this.categories[category];
        await this.$nextTick();
        let topic = getFirstKey(this.topics, this.topic, false);
        this.setTopic(topic);
      },
      setTopic (topic) {
        this.topic = topic;
        this.search();
      },
      setOrder (order) {
        this.order = order;
        this.search();
      },
      search () {
        let { category, topic, order } = this;
        this.$emit('search', {
          category,
          topic,
          order
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./document-search"
</style>
