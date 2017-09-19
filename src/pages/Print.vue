<template>
  <transition name="float-fade">
    <article id="printpage">
      <box-card title="打印点">
        <div class="selector-group" v-if="!focusPoint">
          <span class="tip">请选择目标打印点: </span>
          <linkage-select :linkageDatas="addresses"
                          v-model="focusAddress"
                          @track="setPoints">
          </linkage-select>
        </div>
        <shop-point-card v-model="focusPoint" :points="points">
        </shop-point-card>
      </box-card>
      <box-card :title="`文件列表 (${fileList.length})`" :noPadding="true">
        <upload-box :focusPoint="focusPoint"></upload-box>
      </box-card>
      <box-card title="结算" :noPadding="true">
        <div class="account-tips" v-if="!focusPoint">请在上面的打印点板块选择打印点</div>
        <div class="account-tips" v-else-if="!fileList.length">请添加文件</div>
        <settle-bill v-else :point="focusPoint" :fileList="fileList"></settle-bill>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import {mapState} from 'vuex'
  import boxCard from '@/components/BoxCard'
  import linkageSelect from '@/components/LinkageSelect'
  import shopPointCard from '@/components/ShopPointCard'
  import uploadBox from '@/components/UploadBox'
  import settleBill from '@/components/SettleBill'
  import {getAddresses, getPoints} from '@/api'
  export default {
    name: 'print',
    data () {
      return {
        addresses: {},
        points: []
      }
    },
    mounted () {
      this.initData();
    },
    methods: {
      async initData () {
        this.addresses = await getAddresses();
      },
      async setPoints (focusID) {
        console.info('id', focusID);
        const points = await getPoints(focusID);
        const holidays = {
          'RUNNING': '正在运营',
          'SUMMER_HOLIDAY': '暑假休息',
          'WINTER_HOLIDAY': '寒假休息',
          'CLOSE_DOWN': '关门停业'
        };
        for (let point of points) {
          point.running = point.status == 'RUNNING';
          point.rest_message = holidays[point.status];
          point.colorType = {
            mono: false,
            colorful: false
          };
          for (let size in point.price) {
            for (let caliper in point.price[size]) {
              let colorType = point.price[size][caliper];
              if ('mono' in colorType) point.colorType.mono = true;
              if ('colorful' in colorType) point.colorType.colorful = true;
            }
          }
        }
        this.points = points;
      }
    },
    computed: {
      ...mapState(['fileList']),
      focusAddress: {
        get () {
          return this.$store.state.focusAddress;
        },
        set (address) {
          this.$store.commit('updateFocusAddress', address);
        }
      },
      focusPoint: {
        get () {
          return this.$store.state.focusPoint;
        },
        set (point) {
          this.$store.commit('updateFocusPoint', point);
        }
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
</style>
