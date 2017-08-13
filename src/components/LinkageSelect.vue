<template>
  <div class="area-select">
    <el-select
      :placeholder="placeholders[index] ? placeholders[index] : '请选择'"
      v-for="(item, index) in deep" v-model="currents[index]" :key="index">
      <el-option v-for="val of layerData[index]"
                 :key="val" :label="val" :value="val">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    name: 'linkage-select',
    props: {
      value: {
        required: true,
        type: Array
      },
      placeholders: {
        type: Array,
        default: () => []
      },
      deep: {
        type: Number,
        default: 3,
        validator: (val) => val > 0 && Number.isInteger(val)
      },
      linkageDatas: {
        required: true,
        type: [Array, Object]
      }
    },
    data () {
      return {
        currents: this.value
      }
    },
    computed: {
      layerData: function () {
        let layers = [];
        let layer = this.linkageDatas;
        for (let index = 0; index < this.deep - 1; index++) {
          // first layer aways exist
          layers.push(Object.keys(layer));
          // after but last
          let current = this.currents[index];
          if (current && current in layer) {
            layer = layer[current];
          } else {
            let lastCount = this.deep - index;
            this.currents.splice(index, lastCount, ...new Array(lastCount));
            layers.push(...new Array(lastCount - 1));
            return layers;
          }
        }
        // last layer
        layers.push(layer); // last deep layer must be a array
        if (layer.indexOf(this.currents[this.deep - 1]) == -1) {
          this.currents[this.deep - 1] = '';
        } else {
          // confirm selected until match all layer at last
          this.$emit('input', this.currents);
        }
        return layers;
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scope>
  .area-select
    width: auto
    box-sizing: border-box
    display: inline-block
    position: relative
    vertical-align: middle
    color: #666

  .el-select
    width: 160px
    margin: 0 20px
  .el-input
    font-size: 12px

  .el-input__inner
    height: 26px
    text-align: center
    &:focus
      outline: 0
      box-shadow: 0 0 0 2px rgba(#2db7f5,.2)

</style>
