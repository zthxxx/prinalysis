<template>
  <div class="description">
    <div v-for="(item, index) in description"
         :class="'depict-' + (index % 2 ? 'left' : 'right')">
      <div>
        <img :src="twigs[index % twigs.length]">
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
      twigs: Array,
      description: {
        type: Array,
        required: true,
        default: () => [{
          title: '',
          depicts: ['']
        }]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./depict-card"
</style>
