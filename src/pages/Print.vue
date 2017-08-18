<template>
  <transition name="float-fade">
    <article id="printpage">
      <box-card title="打印点">
        <div class="selector-group" v-if="!selectedPointID">
          <span class="tip">请选择目标打印点: </span>
          <linkage-select
            v-model="address" :deep="3" :linkageDatas="addressData">
          </linkage-select>
        </div>
        <shop-point-card v-model="selectedPointID"
                         :pointsInfo="pointsInfo"
        ></shop-point-card>
      </box-card>
      <box-card title="文件列表" :noPadding="true">
        <upload-box :focusPoint="focusPoint">

        </upload-box>
      </box-card>
      <box-card title="结算" :noPadding="true">
        <!--<div class="account-tips">请添加文件</div>-->
        <settle-bill>

        </settle-bill>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import boxCard from '@/components/BoxCard'
  import linkageSelect from '@/components/LinkageSelect'
  import shopPointCard from '@/components/ShopPointCard'
  import uploadBox from '@/components/UploadBox'
  import settleBill from '@/components/SettleBill'
  import addressData from '@/assets/js/address-data'
  import getPointsInfo from '@/assets/js/getPointsInfo'
  export default {
    name: 'print',
    data () {
      return {
        address: ['北京市'],
        addressData: addressData(),
        selectedPointID: null,
        pointsInfo: []
      }
    },
    created(){
      this.initData();
    },
    methods: {
      initData () {
        const pointsInfo = getPointsInfo();
        const holidays = {
          'RUNNING': '正在运营',
          'SUMMER_HOLIDAY': '暑假休息',
          'WINTER_HOLIDAY': '寒假休息',
          'CLOSE_DOWN': '关门停业'
        };
        for (let point of pointsInfo) {
          point.running = point.status == 'RUNNING';
          point.rest_message = holidays[point.status];
          point.colorType = {
            mono: point.basicPrintItem.monoSingle > 0,
            colorful: point.basicPrintItem.colorfulSingle > 0
          };
        }
        this.pointsInfo = pointsInfo;
      }
    },
    computed: {
      focusPoint: function () {
        for (let point of this.pointsInfo) {
          if (point.hasOwnProperty('pointId')
            && point.pointId == this.selectedPointID) {
            return point;
          }
        }
        return null;
      }
    },
    components: {
      boxCard,
      linkageSelect,
      shopPointCard,
      uploadBox,
      settleBill
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_animate"
  @import "../style/print"
  .account-tips
    width: 100%
    padding: 50px 0
    text-align: center
    color: #999
    font-size: 16px
</style>
