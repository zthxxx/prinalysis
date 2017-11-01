<template>
  <div>
    <div class="table-line">
      <span class="select-title">专题分类</span>
      <el-menu :default-active="category" class="select-radio" mode="horizontal">
        <el-menu-item index="环境工程" class="select-radio-item">环境工程</el-menu-item>
        <el-menu-item index="机械工程" class="select-radio-item">机械工程</el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">专题</span>
      <el-menu :default-active="subject" class="select-radio" mode="horizontal">
        <el-menu-item index="英语四级" class="select-radio-item">英语四级</el-menu-item>
        <el-menu-item index="1" class="select-radio-item">英语六级</el-menu-item>
        <el-menu-item index="2" class="select-radio-item">计算机二级</el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">排序</span>
      <el-menu :default-active="order" class="select-radio" mode="horizontal">
        <el-menu-item index="COLLECTED" class="select-radio-item">收藏量</el-menu-item>
        <el-menu-item index="1" class="select-radio-item">打印量</el-menu-item>
        <el-menu-item index="2" class="select-radio-item">上传时间</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'subject-search',
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
        category: '环境工程',
        subject: '英语四级',
        order: 'COLLECTED'
      };
    },
    computed: {},
    watch: {},
    methods: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./document-search"
</style>
