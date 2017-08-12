<template>
  <div class="description">
    <div v-for="(item, index) in description"
         :class="'depict-' + (index % 2 ? 'left' : 'right')">
      <div>
        <img :src="item.img">
        <div>
          <div>{{item.title}}</div>
          <div v-for="depict in item.depicts">{{depict}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'depict-card',
    data () {
      return {}
    },
    props: {
      description: {
        type: Array,
        required: true,
        default: [{
          img: '',
          title: '',
          depicts: ['']
        }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_variables"
  .description
    width: 100%
    text-align: center
    .flow
      text-align: center
      width: 100%
      margin: 60px auto

  depict-base(direct)
    other-direct = direct == 'left' ? right : left
    height: 420px
    background-color: direct == 'left' ? transparent : descrip-back
    &>div
      max-width: 1400px
      margin: 0 auto
      &>img
        float: other-direct
        margin-{other-direct}: 100px
        margin-top: 80px
      &>div
        float: direct
        margin-{direct}: 160px
        margin-top: 150px
        div
          line-height: 38px
          color: shallow-text-gray
          font-size: 14px
          &:first-child
            font-size: 26px
            margin-bottom: 10px
            color: deep-text-gray

  .depict-right
    depict-base(right)

  .depict-left
    depict-base(left)

</style>
