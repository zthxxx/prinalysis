<template>
  <article class="description">
    <section class="depicts" v-for="(item, index) in description" :key="index">
      <figure>
        <img :src="twigs[index % twigs.length]">
        <figcaption>
          <p>{{item.title}}</p>
          <p v-for="depict in item.depicts" :key="depict">{{depict}}</p>
        </figcaption>
      </figure>
    </section>
  </article>
</template>

<script>
  export default {
    name: 'depict-card',
    props: {
      twigs: {
        type: Array,
        default: () => ['']
      },
      description: {
        type: Array,
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
