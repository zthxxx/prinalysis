<template>
  <div class="description">
    <div v-for="(item, index) in description" :key="index"
         :class="'depict-' + (index % 2 ? 'left' : 'right')">
      <div>
        <img :src="twigs[index % twigs.length]">
        <div>
          <div>{{item.title}}</div>
          <div v-for="depict in item.depicts" :key="depict">{{depict}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'depict-card',
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
    },
    data () {
      return {};
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./depict-card"
</style>
