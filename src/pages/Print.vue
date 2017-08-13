<template>
  <transition name="float-fade">
    <article id="printpage">
      <box-card title="打印点">
        <div class="selector-group">
          <span class="tip">请选择目标打印点: </span>
          <linkage-select
            v-model="address" :deep="3" :linkageDatas="addressData">
          </linkage-select>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{'列表内容 ' + o }}
        </div>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import boxCard from '@/components/BoxCard'
  import linkageSelect from '@/components/LinkageSelect'
  import addressData from '@/assets/js/address-data'
  export default {
    name: 'print',
    data () {
      return {
        address: ['北京市'],
        addressData: addressData
      }
    },
    methods: {},
    components: {boxCard, linkageSelect}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/print"
</style>
