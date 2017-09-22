<template>
  <div :class="{
            'print-point-item': true,
            'no-running': !point.running,
            'zoom-in' : !selectedID,
            'selected': selectedID === point.id
           }"
       :key="`${point.pointName}${point.id}`"
       v-if="!selectedID || selectedID === point.id"
       @click="point.running && selected(point.id)">
    <div class="box">
      <div class="info">
        <div class="top-div">
          <div class="pic-div">
            <img :src="point.image || roleImage[point.pointType]">
          </div>
          <div class="detial-div">
            <div class="point-name">{{point.pointName}}</div>
            <div class="addr">
              <i class="el-icon-fa-map-marker"></i>{{point.address}}
            </div>
            <div class="print-type ">打印类型：{{isColorful(point.colorType).join(' ')}}</div>
            <div class="take-time">
              <template v-if="point.delivery_scope">
                配送时间：<span>{{point.delivery_time}}</span>
              </template>
              <template v-else>
                自助取件时间：<span>{{getFormatTakeTime(point.takeTime)}}</span>
              </template>
            </div>
            <div class="ultra-service">
              配送范围：<span v-if="point.delivery_scope">{{point.delivery_scope}}</span>
              <span v-else class="gray">（本打印点仅提供自提服务）</span>
            </div>
            <div>联系电话：{{point.phone}}</div>
          </div>
        </div>
      </div>
      <div class="price" v-if="selectedID === point.id">
        <div class="price-title">
          <i class="el-icon-fa-list-ul"></i>价格表
        </div>
        <div class="price-list">
          <div v-for="item in getPriceList(point.price)"
               :class="{'price-item': true, 'invalid': !item.price}">
            <div class="price-name">{{item.type}}</div>
            <div class="money">{{item.price || '不支持'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="announce" v-if="point.running">{{point.message}}</div>
    <div class="no-running-tip" v-else>
      <div class="title">{{point.rest_message}}</div>
      <div class="msg">{{point.message}}</div>
    </div>
  </div>
</template>

<script>
  import {ATM, printPoint} from '@/assets/img/print'
  import {formatCNY} from '@/utils/tools'
  export default {
    name: 'shop-point-card',
    props: {
      point: {
        type: Object,
        required: true
      },
      selectedID: {
        default: null
      }
    },
    data () {
      return {
        roleImage: {
          ATM,
          DISPATCHING: printPoint
        },
        typeMap: {
          mono: '黑白',
          colorful: '彩色',
          oneside: '单面',
          duplex: '双面'
        }
      }
    },
    methods: {
      isColorful (printItem) {
        let type = [];
        if (printItem.mono) type.push('黑白打印');
        if (printItem.colorful) type.push('彩色打印');
        return type;
      },
      getFormatTakeTime (takeTime) {
        let momentFormat = new Intl.NumberFormat('en-US', {
          useGrouping: false,
          minimumIntegerDigits: 2
        });
        let momnets = takeTime.map((item) => momentFormat.format(item));
        return `${momnets.slice(0, 2).join(':')}-${momnets.slice(2, 4).join(':')}`;
      },
      selected () {
        this.$emit('input', this.point);
      },
      getPriceList (price) {
        let unitPrice = (value) => value > 0 ? `${formatCNY(value)} / 张` : null;
        let typeMap = this.typeMap;
        let tariff = [];
        for (let {size, caliper, money} of price) {
          let prefix = `${size} ${caliper}纸`;
          for (let color in money) {
            for (let side in money[color]) {
              let unit = money[color][side];
              tariff.push({
                type: `${prefix}${typeMap[color]}${typeMap[side]}`,
                price: unitPrice(unit)
              });
            }
          }
        }
        return tariff;
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./shop-card"
</style>
