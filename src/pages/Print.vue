<template>
  <transition name="float-fade">
    <article id="printpage">
      <boxCard title="打印店">
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </boxCard>
      <boxCard title="打印店-2">
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </boxCard>
    </article>
  </transition>
</template>

<script>
  import boxCard from '@/components/BoxCard'
  export default {
    name: 'print',
    data () {
      return {}
    },
    methods: {},
    components: {boxCard}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_animate"
  .text
    font-size: 14px

  .item
    padding: 18px 0

</style>
