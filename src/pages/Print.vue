<template>
  <transition name="float-fade">
    <article id="printpage">
      <box-card title="打印点">
        <div class="selector-group" v-if="!selectedPoint">
          <span class="tip">请选择目标打印点: </span>
          <linkage-select
            v-model="address" :deep="3" :linkageDatas="addressData">
          </linkage-select>
        </div>
        <shop-point-card v-model="selectedPoint"
                         :pointsInfo="pointsInfo"
        ></shop-point-card>
      </box-card>
      <box-card title="文件列表">
        <upload-box>

        </upload-box>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import boxCard from '@/components/BoxCard'
  import linkageSelect from '@/components/LinkageSelect'
  import shopPointCard from '@/components/ShopPointCard'
  import uploadBox from '@/components/UploadBox'
  import addressData from '@/assets/js/address-data'
  import getPointsInfo from '@/assets/js/getPointsInfo'
  export default {
    name: 'print',
    data () {
      return {
        address: ['北京市'],
        addressData: addressData,
        selectedPoint: null,
        pointsInfo: []
      }
    },
    created(){
      this.initData();
    },
    methods: {
      initData () {
        const pointsInfo = getPointsInfo;
        const holidays = {
          'RUNNING': '正在运营',
          'SUMMER_HOLIDAY': '暑假休息',
          'WINTER_HOLIDAY': '寒假休息',
          'CLOSE_DOWN': '关门停业'
        };
        for (let point of pointsInfo) {
          point.running = point.status == 'RUNNING';
          point.rest_message = holidays[point.status];
        }
        this.pointsInfo = pointsInfo;
      }
    },
    components: {
      boxCard,
      linkageSelect,
      shopPointCard,
      uploadBox
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/print"

</style>
