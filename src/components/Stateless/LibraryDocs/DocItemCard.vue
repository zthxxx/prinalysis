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
          <span class="user" @click.stop="viewPerson">
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
        <slot name="tips">
          <i class="el-icon-fa-list-ul"></i>
          点击查看详情
        </slot>
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
      },
      uid: {
        type: String,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    mounted () {},
    methods: {
      viewPerson () {
        let uid = this.uid
        this.$router.push({ name: 'person-view', params: { uid } })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./doc-card-item"
</style>
