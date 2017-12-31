<template>
  <section class="box-card">
    <header class="card-header" v-if="title">
      <div class="card-title">{{title}}</div>
    </header>
    <div :class="{'card-body': !noPadding}">
      <slot></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'box-card',
    props: {
      title: {
        type: String,
        required: false
      },
      noPadding: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {}
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./box-card"
</style>
