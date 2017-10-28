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
        <el-menu :default-active="seachMethod" class="selector-tabs" mode="horizontal">
          <el-menu-item index="profession" class="selector-item">通过专业科目查找</el-menu-item>
          <el-menu-item index="subject" class="selector-item">通过专题查找</el-menu-item>
        </el-menu>
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
      </box-card>
      <box-card class="documents">
        <el-menu :default-active="seachType" class="selector-tabs" mode="horizontal">
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
  import linkageSelect from '$@/UI/LinkageSelect';
  export default {
    name: 'library',
    components: { boxCard, linkageSelect },
    props: {},
    data () {
      return {
        seachMethod: 'profession',
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
        order: 'COLLECTED',
        seachType: 'file'
      };
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
