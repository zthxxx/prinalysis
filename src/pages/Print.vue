<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="title">打印点</div>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'print',
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .text
    font-size: 14px

  .item
    padding: 18px 0

  .clearfix
    &:before, &:after
      display: table
      content: ""
    &:after
      clear: both

  .header
    padding: 8px 0
    border-bottom: 1px dashed #ddd

  .title
    font-size: 18px
    margin-left: 18px
    padding-left: 12px
    border-left: 3px solid #0e90d2
    color: #0e90d2

  .box-card
    width: 1080px
    background-color: #fff
    margin: 10px auto
    border-radius: 3px
    box-shadow: 0 0 4px 1px #ddd
    padding-bottom: 20px

</style>
