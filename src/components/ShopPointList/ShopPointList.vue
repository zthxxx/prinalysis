<template>
  <div>
    <div class="point-detial-title" v-if="selectedID">
      <el-button type="text" class="back" icon="fa-chevron-left"
                 @click="selectPoint(null)">选择其他打印点
      </el-button>
      <span class="tip"> 已选择该打印点: </span>
    </div>
    <div class="print-point-list">
      <shop-point-card v-for="(point, index) in points"
                       :key="index"
                       :point="point"
                       :selectedID="selectedID"
                       @input="selectPoint">
      </shop-point-card>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import shopPointCard from './ShopPointCard.vue';

  export default {
    name: 'shop-point-list',
    model: {
      prop: 'focusPoint'
    },
    components: { shopPointCard },
    props: {
      focusPoint: {
        type: null
      },
      points: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        selectedID: _.get(this.focusPoint, 'id', null)
      };
    },
    methods: {
      selectPoint (focusPoint) {
        this.selectedID = _.get(focusPoint, 'id', null);
        this.$emit('input', focusPoint);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./shop-list"
</style>
