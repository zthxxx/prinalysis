<template>
  <div>
    <div class="point-detial-title" v-if="selectedID">
      <el-button type="text" class="back" icon="fa-chevron-left"
                 @click="setlectPoint(null)">选择其他打印点
      </el-button>
      <span class="tip"> 已选择该打印点: </span>
    </div>
    <div class="print-point-list">
      <div v-for="point in points"
           :class="{
            'print-point-item': true,
            'no-running': !point.running,
            'zoom-in' : !selectedID,
            'selected': selectedID == point.pointID
           }"
           :key="`${point.pointName}${point.pointID}`"
           v-if="!selectedID || selectedID == point.pointID"
           @click="point.running && setlectPoint(point.pointID)">
        <div class="box">
          <div class="info">
            <div class="top-div">
              <div class="pic-div">
                <img :src="point.image || imgDefault">
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
          <div class="price" v-if="selectedID == point.pointID">
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
    </div>
  </div>
</template>

<script>
  import {formatCNY} from '@/utils/tools'
  export default {
    name: 'shop-point-card',
    props: {
      value: {
        required: true
      },
      points: {
        type: Array,
        default: () => [{
          pointID: '001',
          running: true,
          rest_message: '假期休息',
          pointType: ['ATM'],
          delivery_scope: '配送范围',
          delivery_time: '配送时间',
          phone: '12345678910',
          pointName: '店名',
          address: '详细地址',
          message: '提示信息',
          image: require('@/assets/img/print/ATM.jpg'),
          takeTime: [0, 0, 24, 0],
          price: {
            A4: {
              '70g': {
                mono: {
                  oneside: 10,
                  duplex: 15
                }
              }
            }
          },
          colorType: {
            mono: true,
            colorful: true
          }
        }]
      }
    },
    data () {
      return {
        imgDefault: require('@/assets/img/print/ATM.jpg'),
        selectedID: this.value && this.value.pointID ? this.value.pointID : null,
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
      focusPoint () {
        for (let point of this.points) {
          if (point.hasOwnProperty('pointID')
            && point.pointID == this.selectedID) {
            return point;
          }
        }
        return null;
      },
      setlectPoint (pointID) {
        this.selectedID = pointID;
        this.$emit('input', this.focusPoint());
      },
      getPriceList (price) {
        let unitPrice = (value) => value > 0 ? `${formatCNY(value)} / 张` : null;
        let typeMap = this.typeMap;
        let tariff = [];
        for (let size in price) {
          for (let caliper in price[size]) {
            let prefix = `${size} ${caliper}纸`;
            let colorType = price[size][caliper];
            for (let color in colorType) {
              for (let side in colorType[color]) {
                let unit = colorType[color][side];
                tariff.push({
                  type: `${prefix}${typeMap[color]}${typeMap[side]}`,
                  price: unitPrice(unit)
                });
              }
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
  @import "../style/_variables"
  @import "../style/_animate"
  .print-point-list
    width: 880px
    margin: 4px auto
    text-align: center
    font-size: 12px
    line-height: 1.5
    color: #666

  .print-point-item
    display: inline-block
    position: relative
    vertical-align: top
    text-align: left
    width: 400px
    padding-bottom: 4px
    border: 1px solid #ddd
    box-sizing: border-box
    border-radius: 4px
    margin: 10px 20px
    cursor: pointer
    overflow: hidden
    white-space: nowrap
    &:hover
      box-shadow: 0 0 6px 2px #eee
    .announce
      width: 100%
      text-align: center
      border-top: 1px solid #eee
      padding-top: 4px
      color: #f63
    &.selected
      width: 840px
      border-left: 4px solid theme-green-dark
      cursor: auto
      transition: all .3s ease-out
      &:hover
        box-shadow: none
    &.no-running
      cursor: not-allowed
      &:hover
        box-shadow: none
    .no-running-tip
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      border-radius: 6px
      text-align: center
      display: flex
      flex-direction: column
      justify-content: flex-end
      .title
        background-color: rgba(#fff, .8)
        color: #aaa
        font-size: 28px
        padding: 8px 0
      .msg
        background-color: rgba(#fff, .8)
        padding: 4px 10px

  .box
    display: flex
    .price
      vertical-align: top
      flex-grow: 1
      width: 240px
      border-left: 1px dashed #ddd
      .price-title
        color: theme-text-color
        font-size: 16px
        margin: 10px 0 0 14px
        i
          padding-right: 4px
          .min-charge
            font-size: 14px
      .price-list
        margin: 6px auto 10px
        width: 90%
        height: 100px
        overflow-y: auto
        scrollbar 6px
        &::-webkit-scrollbar
          width: 6px
        .price-item
          width: 86%
          height: 24px
          margin: 0 auto
          padding: 0 2px
          border-bottom: 1px solid #f3f3f3
          display: flex
          align-items: center
          justify-content: space-between
          color: #555
          &.invalid
            color: #bbb
    .discount
      vertical-align: top
      display: inline-block
      width: 200px
      border-left: 1px dashed #ddd
      .discount-title
        color: theme-text-color
        font-size: 16px
        margin: 10px 0 8px 14px
        i
          padding-right: 4px
        .min-charge
          font-size: 14px
      .favor
        color: #096
        font-size: 13px
        margin: 6px 16px

    .info
      vertical-align: top
      flex-grow: 1
      padding-bottom: 4px
      .pic-div
        vertical-align: top
        display: inline-block
        width: 138px
        height: 138px
        img
          width: 84%
          margin: 8% 0 8% 9%

  .detial-div
    vertical-align: top
    display: inline-block
    width: 250px
    padding: 0 0 6px 8px
    border: none
    .point-name
      font-size: 18px
      color: theme-text-color
      margin-top: 6px
    .addr
      color: theme-green-dark
      margin-top: 2px
      font-size: 14px
      i
        margin-right: 6px
    .print-type
      margin-top: 4px
    .gray
      color: #ccc
    .favor
      margin-top: 6px
      color: theme-green-dark

  .point-detial-title
    width: 840px
    margin: 0 auto
    .back
      color: shallow-text-gray
      font-size: 12px
      vertical-align: middle
      background: transparent
      border: none
      border-radius: 4px
      padding: 4px 10px
      cursor: pointer
      transition: all .2s ease-out
      &:hover
        background: #eee
    .tip
      vertical-align: middle
      border-left: 1px solid #ddd
      padding-left: 10px
      margin-left: 10px
      color: #096
      font-size: 16px

</style>
