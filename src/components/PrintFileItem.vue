<template>
  <transition name="left-fade">
    <div class="PrintFileItem">
      <div class="Print_file">
        <div class="valid-index">{{`#${index + 1}`}}</div>
        <div class="logoHolder">
          <div class="logoPos"><img :src="fileIcon[file.raw.extension]">
            <div>{{`${file.raw.pageInfo.pageCount}页`}}</div>
          </div>
        </div>
        <div class="fileInf">
          <div class="Name">{{file.name}}</div>
          <div class="kejian-tip"></div>
          <div class="Sourse"><span>来源：<span>{{file.raw.origin}}</span></span></div>
        </div>
        <div class="fadeIn">
          <div class="delete">
            <div class="Com_del">
              <div class="tip">共需打印 {{total}} 张纸</div>
              <div class="right-btn">
                <el-button class="del-btn" icon="fa-file-text-o"
                           @click="handlePreview(file)">&nbsp;打印预览
                </el-button>
              </div>
              <div class="right-btn">
                <el-button class="del-btn" icon="delete2"
                           @click="handleRemove(file)">&nbsp;移除文件
                </el-button>
              </div>
            </div>
          </div>
          <div class="Print_file_printChoice">
            <ul>
              <li>
                <div>色彩</div>
                <div class="choiceSelect">
                  <el-select v-model="setting.color" style="width: 85px;">
                    <el-option label="黑白" value="mono" :disabled="!('mono' in colorable)"></el-option>
                    <el-option label="彩色" value="colorful" :disabled="!('colorful' in colorable)"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>单双面</div>
                <div class="choiceSelect">
                  <el-select v-model="setting.side" style="width: 85px;">
                    <el-option label="单面" :value="1" :disabled="!('oneside' in sideable)"></el-option>
                    <el-option label="双面" :value="2" :disabled="!('duplex' in sideable)"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>多合一</div>
                <div class="choiceSelect">
                  <el-select v-model="setting.layout" style="width: 80px;">
                    <el-option label="1合1" :value="1"></el-option>
                    <el-option label="2合1" :value="2"></el-option>
                    <el-option label="4合1" :value="4"></el-option>
                    <el-option label="6合1" :value="6"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>份数</div>
                <div class="choiceSelect">
                  <el-input-number class="choiceNum" v-model="setting.copies" :min="1" :max="1000"></el-input-number>
                </div>
              </li>
            </ul>
          </div>
          <div id="heightSetContent" class="setting">
            <div class="print-area">
              <span class="area-tip">打印范围 </span>
              <span class="lingkage-are">
                <el-input-number class="print-area-input" :controls="false"
                                 v-model="setting.startPage"
                                 :min="1"
                                 :max="setting.endPage">
                </el-input-number>
                <span>-</span>
                <el-input-number class="print-area-input" :controls="false"
                                 v-model="setting.endPage"
                                 :min="setting.startPage"
                                 :max="file.raw.pageInfo.pageCount">
                </el-input-number>
              </span>
            </div>
            <div class="print-area">
              <span style="margin-right: 2px;">纸张</span>
              <el-select v-model="sizeside" style="width: 160px;">
                <template v-for="(calipers, size) in price">
                  <el-option v-for="(colors, caliper) in calipers"
                             :label="`${size} ${caliper} 白纸`"
                             :value="JSON.stringify({size, caliper})"
                             :key="`${size} ${caliper}`">
                  </el-option>
                </template>
                <el-option v-if="!price"
                           :label="`${setting.size} ${setting.caliper} 白纸`"
                           :value="sizeside">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'print-file-item',
    model: {
      prop: 'preSetting'
    },
    props: {
      price: {
        required: true,
        default: null
      },
      index: {
        type: Number,
        required: true,
        default: 1
      },
      file: {
        type: Object,
        default: () => ({
          name: 'xxx.docx',
          raw: {
            md5: 'xxx',
            extension: 'docx',
            pageInfo: {pageCount: 3, direction: true},
            origin: '本地上传'
          },
        })
      },
      preSetting: {
        type: Object,
        default: () => ({
          layout: 1,
          copies: 1,
          size: 'A4',
          caliper: '70g',
          color: 'mono',
          side: 2,
          startPage: 1,
          endPage: 1,
        })
      },
      handleRemove: {
        type: Function,
        required: true
      },
      handlePreview: {
        type: Function,
        required: true
      }
    },
    data () {
      return {
        setting: null,
        fileIcon: {
          doc: require('@/assets/img/print/icon-word.png'),
          docx: require('@/assets/img/print/icon-word.png'),
          ppt: require('@/assets/img/print/icon-ppt.png'),
          pptx: require('@/assets/img/print/icon-ppt.png'),
          jpg: require('@/assets/img/print/icon-img.jpg'),
          png: require('@/assets/img/print/icon-img.jpg')
        }
      }
    },
    created () {
      this.setting = this.preSet(this.preSetting);
    },
    watch: {
      setting: {
        handler (newSetting)  {
          this.$store.commit('updateFileSetting', {
            uid: this.file.uid,
            setting: newSetting
          });
        },
        deep: true
      },
      price: {
        handler (newPrice) {
          if (newPrice) {
            this.setting = this.preSet(this.setting);
          }
        },
        deep: true
      }
    },
    methods: {
      preSet (setting) {
        if (!this.price) return setting;
        let {size, caliper, color, side} = setting;
        if (!(size in this.price)) {
          size = 'A4' in this.price ? 'A4' : Object.keys(this.price).shift();
        }
        if (!(caliper in this.price[size])) {
          caliper = Object.keys(this.price[size]).shift();
        }
        let colors = this.price[size][caliper];
        if (!(color in colors)) {
          color = Object.keys(colors).shift();
        }
        let sideMap = ['oneside', 'duplex'];
        if (!(sideMap[setting.side - 1] in colors[color])) {
          side = sideMap.length + 1 - side;
        }
        return {
          ...setting,
          size,
          caliper,
          color,
          side
        }
      }
    },
    computed: {
      colorable () {
        let setting = this.setting;
        return _.get(this.price, [setting.size, setting.caliper], {});
      },
      sideable () {
        let setting = this.setting;
        return _.get(this.price, [setting.size, setting.caliper, setting.color], {});
      },
      sizeside: {
        get () {
          return JSON.stringify({
            size: this.setting.size,
            caliper: this.setting.caliper
          });
        },
        set (value) {
          Object.assign(this.setting, JSON.parse(value));
          this.setting = this.preSet(this.setting);
        }
      },
      total () {
        let setting = this.setting;
        return Math.ceil(
          (setting.endPage - setting.startPage + 1)
          * setting.copies / setting.side
        );
      },
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_animate"
  .Print_file
    position: relative
    width: 1000px
    margin: 0 auto 16px
    border: 1px solid #ddd
    border-radius: 4px
    font-size: 16px
    background-color: #fff
    text-align: left
    color: #666
    .valid-index
      position: absolute
      font-size: 12px
      color: #bbb
      padding-left: 4px
    .logoHolder
      position: absolute
      display: inline-block
      width: 100px
      height: 100%
      border-right: 1px dashed #ddd
      text-align: center
      .logoPos
        position: relative
        top: 50%
        margin-top: -40px
        img
          width: 55px
        div
          color: #666
          font-size: 14px
    .fileInf
      position: absolute
      height: 80px
      top: 50%
      margin-top: -40px
      left: 120px
      line-height: 2em
      display: inline-block
      .Name
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        max-width: 340px
      .lesson-tip
        position: absolute
        font-size: 12px
        margin-top: 1px
        color: #ff4500
        top: 30%
      .Sourse
        width: 280px
        margin-top: 18px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        font-size: 14px
        color: #999

  .delete
    position: absolute
    width: 120px
    height: 85%
    margin: 10px 0
    border-left: 1px solid #ddd
    right: 0
    font-size: 14px
    color: #333
    text-align: center
    .Com_del
      position: relative
      width: 120px
      height: 100px
      top: 50%
      margin: -45px auto
      font-size: 13px
      text-align: center
      z-index: 100
      & > div
        padding: 8px 0 0
      .tip
        font-size: 12px
        color: #999
      .del-btn
        margin: 4px 0 0
        font-size: 13px
        border: none
        padding: 0

  .Print_file_printChoice
    position: relative
    height: 88px
    width: 420px
    margin: 0 130px 0 auto
    ul
      display: block
      position: absolute
      height: 70px
      margin: 20px 0
      right: 0
      font-size: 13px
    li
      position: relative
      display: block
      float: left
      text-align: center
      margin: 0 10px
    .choiceSelect
      position: relative
      height: 28px
      margin-top: 10px
    .choiceNum
      width: 80px

  .setting
    overflow: hidden
    position: relative
    display: block
    font-size: 14px
    left: 45%
    width: 450px
    margin-bottom: 10px
    .print-area
      margin: 0 10px 10px
      display: inline-block
      text-align: center
      .area-tip
        margin: 0 5px 0 10px
      .lingkage-are span
        margin: 0 4px
    .print-area-input
      width: 43px

</style>
