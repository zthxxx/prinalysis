<template>
  <div class="box-card">
    <div class="card-header" v-if="title">
      <div class="card-title">{{title}}</div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'print',
    data () {
      return {}
    },
    props: {
      title: {
        type: String,
        required: false
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"
  .box-card
    width: 1080px
    background-color: #fff
    margin: 10px auto
    border-radius: 3px
    box-shadow: 0 0 4px 1px #ddd

  .card-header
    padding: 8px 0
    border-bottom: 1px dashed #ddd

  .card-title
    font-size: 18px
    margin-left: 18px
    padding-left: 12px
    border-left: 3px solid dark-blue
    color: dark-blue

  .card-body
    padding: 20px
</style>
