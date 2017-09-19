<template>
  <div class="area-select">
    <el-select class="selecter"
               v-for="(layer, index) in layerData" v-model="currents[index]" :key="index"
               :placeholder="placeholders[index] ? placeholders[index] : '请选择'">
      <el-option v-for="item of layer"
                 :key="index + item" :label="item" :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'linkage-select',
    props: {
      value: {
        type: Array,
        default: () => []
      },
      placeholders: {
        type: Array,
        default: () => []
      },
      linkageDatas: {
        required: true,
        type: [Array, Object],
        default: () => ({})
      },
      defaultSelected: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        currents: [...this.value]
      }
    },
    methods: {
      isEmpty (obj) {
        return !Object.keys(obj).length;
      }
    },
    computed: {
      layerData: function () {
        let layers = [];
        let layer = this.linkageDatas;
        let currents = this.currents;
        if (this.isEmpty(layer)) {
          layers =  [[]];
          return layers;
        }
        let index = 0;
        while (layer instanceof Array) {
          let current = currents[index];
          let nextLayer = layer;
          layers.push(layer.map((item) => {
            if (current in item) nextLayer = item[current];
            return Object.keys(item)[0];
          }));
          if (nextLayer === layer) {
            let key = Object.keys(layer[0])[0];
            currents.splice(index, currents.length);
            layer = layer[0][key];
            if (!this.defaultSelected) {
              while (layer instanceof Array) {
                layers.push([]);
                currents.push('');
                layer = Object.values(layer[0])[0];
              }
              return layers;
            }
            currents.push(key);
          } else {
            layer = nextLayer;
          }
          index ++;
        }
        this.$emit('input', currents);
        this.$emit('track', layer);
        return layers;
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '../style/_variables'
  .area-select
    width: auto
    box-sizing: border-box
    display: inline-block
    position: relative
    vertical-align: middle
    color: #666

  .selecter
    width: 160px
    margin: 0 20px

</style>
