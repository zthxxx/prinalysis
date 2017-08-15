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
        <shop-point-card v-model="selectedPoint"></shop-point-card>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import boxCard from '@/components/BoxCard'
  import linkageSelect from '@/components/LinkageSelect'
  import addressData from '@/assets/js/address-data'
  import shopPointCard from '@/components/ShopPointCard'
//  import pointInfo from '@/assets/js/getPointsInfo'
  export default {
    name: 'print',
    data () {
      return {
        address: ['北京市'],
        addressData: addressData,
        selectedPoint: null
      }
    },
    methods: {},
    components: {boxCard, linkageSelect, shopPointCard}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/print"

</style>
