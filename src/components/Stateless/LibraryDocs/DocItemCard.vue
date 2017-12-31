<template>
  <section class="doc-item-card">
    <div class="doc-item-box">
      <figure class="doc-view">
        <img class="doc-icon" :src="iconURL" />
        <figcaption class="count"><slot name="count"></slot></figcaption>
      </figure>
      <div class="descripte">
        <header class="doc-name"><slot name="doc-name"></slot></header>
        <div>
          <span class="user">
            <i class="el-icon-fa-user"></i>
            <slot name="user"></slot>
          </span>
          <span class="created"><slot name="created"></slot></span>
        </div>
        <span class="collected">
          <i class="el-icon-fa-bookmark-o"></i>
          收藏 <slot name="collected"></slot>
        </span>
        <span class="reviews">
          <slot name="reviews"></slot>
        </span>
      </div>
    </div>
    <footer>
      <span>
        <i class="el-icon-fa-list-ul"></i>&nbsp;
        <slot name="tips"></slot>
      </span>
    </footer>
  </section>
</template>

<script>
  export default {
    name: 'doc-card-item',
    components: {},
    props: {
      iconURL: {
        type: String,
        required: false
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./doc-card-item"
</style>
