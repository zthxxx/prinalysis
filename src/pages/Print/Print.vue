<template>
  <transition name="float-fade">
    <article id="printpage" key="print">
      <box-card title="打印点">
        <div class="selector-group" v-if="!focusPoint">
          <span class="tip">请选择目标打印点: </span>
          <linkage-select :linkageDatas="addresses"
                          v-model="focusAddress"
                          @track="setPoints">
          </linkage-select>
        </div>
        <shop-point-list v-model="focusPoint" :points="points">
        </shop-point-list>
      </box-card>
      <box-card :title="`文件列表 (${fileList.length})`" :noPadding="true">
        <upload-box ref="uploader"
                    :fileList="fileList"
                    :updateFiles="commitFiles">
          <print-file-list :point="focusPoint"
                           :fileList="fileList"
                           :updateSetting="updateSetting"
                           :handleRemove="removeFile"
                           :handlePreview="handlePreview">
          </print-file-list>
        </upload-box>
      </box-card>
      <box-card title="结算" :noPadding="true">
        <div class="account-tips" v-if="!focusPoint">请在上面的打印点板块选择打印点</div>
        <div class="account-tips" v-else-if="!fileList.length">请添加文件</div>
        <settle-bill v-else :point="focusPoint" :fileList="fileList" :updateFiles="commitFiles"></settle-bill>
      </box-card>
    </article>
  </transition>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import _ from 'lodash';
  import boxCard from '@/components/BoxCard';
  import linkageSelect from '@/components/LinkageSelect';
  import ShopPointList from '@/components/ShopPointList';
  import uploadBox from '@/components/UploadBox';
  import printFileList from '@/components/PrintFileList';
  import settleBill from '@/components/SettleBill';
  import { getAddresses, getPoints } from '@/api';
  import * as types from '@/store/mutation-types';
  import { mapModel } from '@/utils/tools';

  export default {
    name: 'print',
    components: {
      boxCard,
      linkageSelect,
      ShopPointList,
      uploadBox,
      printFileList,
      settleBill
    },
    data () {
      return {
        addresses: {},
        points: []
      };
    },
    computed: {
      ...mapState('print', ['fileList']),
      ...mapModel('print', {
        focusAddress: types.SELECT_ADDRESS,
        focusPoint: types.SELECT_POINT
      })
    },
    mounted () {
      this.initData();
    },
    methods: {
      ...mapMutations('print', {
        updateSetting: types.SET_PRINTING,
        commitFiles: types.UPDATE_FILES
      }),
      async initData () {
        this.addresses = await getAddresses();
      },
      async setPoints (focusID) {
        const points = await getPoints(focusID);
        if (!points.length) {
          this.$notify.warning({
            title: '打印点为空',
            message: '该处地址下暂时没有打印点哟，敬请期待~'
          });
        }
        const holidays = {
          'RUNNING': '正在运营',
          'SUMMER_HOLIDAY': '暑假休息',
          'WINTER_HOLIDAY': '寒假休息',
          'CLOSE_DOWN': '关门停业'
        };
        for (let point of points) {
          point.running = point.status === 'RUNNING';
          point.rest_message = holidays[point.status];
          point.colorType = {
            mono: false,
            colorful: false
          };
          for (let { money } of point.price) {
            if ('mono' in money) point.colorType.mono = true;
            if ('colorful' in money) point.colorType.colorful = true;
          }
        }
        this.points = points;
      },
      removeFile (file) {
        this.$refs.uploader.transmitRemove(file);
      },
      handlePreview (file) {
        this.$preview({
          price: _.get(this.focusPoint, 'price'),
          file,
          updateSetting: this.updateSetting
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./print"
</style>
