<template>
  <div>
    <div class="table-line">
      <span class="select-title">学校学院</span>
      <linkage-select :linkageDatas="institutes" v-model="institute"></linkage-select>
    </div>
    <div class="table-line">
      <span class="select-title">专业</span>
      <el-menu :default-active="major" class="select-radio" mode="horizontal">
        <el-menu-item index="环境工程" class="select-radio-item">环境工程</el-menu-item>
        <el-menu-item index="机械工程" class="select-radio-item">机械工程</el-menu-item>
        <el-menu-item index="车辆工程" class="select-radio-item">车辆工程</el-menu-item>
        <el-menu-item index="通信工程" class="select-radio-item">通信工程</el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">学期</span>
      <el-menu :default-active="semester" class="select-radio" mode="horizontal">
        <el-menu-item index="大一上" class="select-radio-item">大一上</el-menu-item>
        <el-menu-item index="大一下" class="select-radio-item">大一下</el-menu-item>
        <el-menu-item index="大二上" class="select-radio-item">大二上</el-menu-item>
        <el-menu-item index="大二下" class="select-radio-item">大二下</el-menu-item>
      </el-menu>
    </div>
    <div class="table-line">
      <span class="select-title">科目</span>
      <el-menu :default-active="subject" class="select-radio" mode="horizontal">
        <el-menu-item index="ALL" class="select-radio-item">全部</el-menu-item>
        <el-menu-item index="1" class="select-radio-item">环境与艺术</el-menu-item>
        <el-menu-item index="2" class="select-radio-item">线性代数与解析几何</el-menu-item>
        <el-menu-item index="3" class="select-radio-item">微积分</el-menu-item>
        <el-menu-item index="4" class="select-radio-item">过程装备与控制工程</el-menu-item>
        <el-menu-item index="5" class="select-radio-item">材料成型与分解制作</el-menu-item>
        <el-menu-item index="6" class="select-radio-item">过程装备与控制工程</el-menu-item>
        <el-menu-item index="7" class="select-radio-item">能源化学</el-menu-item>
        <el-menu-item index="8" class="select-radio-item">给排水工程</el-menu-item>
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
  import linkageSelect from '$@/UI/LinkageSelect';

  export default {
    name: 'profession-search',
    components: { linkageSelect },
    props: {},
    data () {
      return {
        institutes: [
          {
            'xxx 科技大学': [
              { 'xxx 方向专业': 'major id' }
            ]
          }
        ],
        institute: [],
        major: '环境工程',
        semester: '大一上',
        subject: 'ALL',
        order: 'COLLECTED'
      };
    },
    computed: {},
    watch: {},
    mounted: {},
    methods: {}
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./document-search"
</style>
