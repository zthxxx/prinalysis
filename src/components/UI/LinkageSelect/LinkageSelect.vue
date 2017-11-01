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
  import _ from 'lodash';

  export default {
    name: 'linkage-select',
    model: {
      prop: 'focused',
      event: 'currents'
    },
    props: {
      focused: {
        type: Array,
        default: () => []
      },
      placeholders: {
        type: Array,
        default: () => []
      },
      linkageDatas: {
        type: [Array, Object],
        default: () => ({})
      },
      defaultSelected: {
        type: Boolean,
        default: true
      },
      firstMountEmit: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        currents: [...this.focused],
        firstMount: this.firstMountEmit
      };
    },
    computed: {
      layerData: function () {
        let layers = [];
        let layer = this.linkageDatas;
        let currents = this.currents;
        if (_.isEmpty(layer)) {
          layers = [[]];
          return layers;
        }
        let index = 0;
        while (layer instanceof Array) {
          let current = currents[index];
          let nextLayer = layer;
          layers.push(layer.map((item) => {
            if (current in item) nextLayer = item[current];
            return _.findKey(item);
          }));
          if (nextLayer === layer) {
            let key = _.findKey(layer[0]);
            currents.splice(index, currents.length);
            layer = layer[0][key];
            if (!this.defaultSelected) {
              while (layer instanceof Array) {
                layers.push([]);
                layer = _.find(layer[0]);
              }
              return layers;
            }
            currents.push(key);
          } else {
            layer = nextLayer;
          }
          index++;
        }
        if (!_.isEqual(currents, this.focused) || this.firstMount) {
          this.firstMount = false;
          this.$emit('currents', [...currents]);
          this.$emit('track', layer);
        }
        return layers;
      }
    },
    watch: {
      focused: {
        handler (focused) {
          if (!_.isEqual(this.currents, focused)) this.currents = [...focused];
        }
      },
      deep: true
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import './linkage-select'
</style>
