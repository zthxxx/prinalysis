<template>
  <div class="print-point-list">
    <div v-for="point in pointsInfo"
         :class="{'print-point-item zoom-in': true, 'no-running': !point.running, 'selected': selectedID == point.pointId}"
         v-if="!selectedID || selectedID == point.pointId"
         @click="setlectPoint(point)">
      <div class="box">
        <div class="info">
          <div class="top-div">
            <div class="pic-div">
              <img :src="point.imageUrl">
            </div>
            <div class="detial-div">
              <div class="point-name">{{point.printPointName}}</div>
              <div class="addr">
                <i class="el-icon-fa-map-marker"></i>{{point.address}}
              </div>
              <div class="print-type ">打印类型：{{isColorful(point.basicPrintItem).join(' ')}}</div>
              <div class="take-time">
                <template v-if="point.delivery_scope">
                  配送时间：<span>{{point.delivery_time}}</span>
                </template>
                <template v-else>
                  自助取件时间：<span>{{getFormatTakeTime(point.takeTime)}}</span>
                </template>
              </div>
              <div class="ultra-service">配送范围：
                <span v-if="point.delivery_scope">{{point.delivery_scope}}</span>
                <span v-else class="gray">（本打印点仅提供自提服务）</span>
              </div>
              <div>联系电话：{{point.phoneNumber}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="announce" v-if="point.running">{{point.message}}</div>
      <div class="no-running-tip" v-else>
        <div class="title">假期休息</div>
        <div class="msg">{{point.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shop-point-card',
    props: {
      value: {
        required: true
      },
      pointsInfo: {
        type: Array,
        default: () => [{
          'pointId': '002', // api transform
          'running': true, // api transform
          'pointType': ['ATM'],
          'delivery_scope': '配送范围',
          'delivery_time': '配送时间',
          'phoneNumber': '12345678910',
          'printPointName': '店名',
          'address': '详细地址',
          'message': '提示信息',
          'imageUrl': require('@/assets/img/print/ATM.jpg'),
          'takeTime': [0, 0, 24, 0],
          'basicPrintItem': {
            'monoSingle': 10,
            'colorfulSingle': 80
          }
        }]
      }
    },
    data () {
      return {
        selectedID: null
      }
    },
    methods: {
      isColorful (printItem) {
        let type = [];
        if (printItem.monoSingle !== -1)
          type.push('黑白打印');
        if (printItem.colorfulSingle !== -1)
          type.push('彩色打印');
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
      setlectPoint (point) {
        this.selectedID = point.pointId;
        this.$emit('input', this.selectedID);
      }
    },
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    -webkit-transition-property: all
    transition: all .3s ease-out
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
      border-left: 4px solid #096
      cursor: auto
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
        color: #0e90d2
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
        color: #0e90d2
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
      color: #0e90d2
      margin-top: 6px
    .addr
      color: #096
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
      color: #096

  .full-bg
    display: inline-block
    width: 17px
    height: 17px
    border-radius: 4px
    margin-right: 4px
    background-color: #096
    color: #fff
    line-height: 19px
    text-align: center
</style>
