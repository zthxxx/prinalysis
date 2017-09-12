<template>
  <transition name="left-fade">
    <div class="print-file-item">
      <div class="print-file">
        <div class="valid-index" v-if="index">{{`#${index + 1}`}}</div>
        <div class="logo-holder">
          <div class="logo"><img :src="fileIcon[file.raw.extension]">
            <div>{{`${file.raw.pageInfo.pageCount}页`}}</div>
          </div>
        </div>
        <div class="file-info">
          <div class="name">{{file.name}}</div>
          <div class="source"><span>来源：<span>{{file.raw.origin}}</span></span></div>
        </div>
        <div class="fade-in">
          <div class="delete">
            <div class="control">
              <slot name="control">
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
              </slot>
            </div>
          </div>
          <div class="print-choice">
            <ul>
              <li>
                <div>色彩</div>
                <div class="selectors">
                  <el-select class="colors" v-model="setting.color">
                    <el-option label="黑白" value="mono" :disabled="!('mono' in colorable)"></el-option>
                    <el-option label="彩色" value="colorful" :disabled="!('colorful' in colorable)"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>单双面</div>
                <div class="selectors">
                  <el-select class="sides" v-model="setting.side">
                    <el-option label="单面" :value="1" :disabled="!('oneside' in sideable)"></el-option>
                    <el-option label="双面" :value="2" :disabled="!('duplex' in sideable)"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>多合一</div>
                <div class="selectors">
                  <el-select class="layouts" v-model="layout">
                    <el-option label="1合1" :value="1"></el-option>
                    <el-option label="2合1" :value="2"></el-option>
                    <el-option label="4合1" :value="4"></el-option>
                    <el-option label="6合1" :value="6"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>份数</div>
                <div class="selectors">
                  <el-input-number class="copies" v-model="setting.copies" :min="1" :max="1000"></el-input-number>
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
              <span>纸张</span>
              <el-select class="sizeside" v-model="sizeside">
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
  import {sideMap, checkset} from '@/utils/tools'
  export default {
    name: 'print-file-item',
    props: {
      price: {
        required: true,
        default: null
      },
      index: {
        type: Number,
        default: null
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
          }
        })
      },
      preSetting: {
        type: Object,
        default: () => ({
          copies: 1,
          size: 'A4',
          caliper: '70g',
          color: 'mono',
          side: 1,
          row: 1,
          col: 1,
          startPage: 1,
          endPage: 1
        })
      },
      handleRemove: {
        type: Function
      },
      handlePreview: {
        type: Function
      }
    },
    data () {
      return {
        setting: {...this.preSetting},
        layouts: {
          1: {row: 1, col: 1},
          2: {row: 1, col: 2},
          4: {row: 2, col: 2},
          6: {row: 2, col: 3},
        },
        sideMap: sideMap,
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
    watch: {
      setting: {
        handler (newSetting)  {
          for (let key of _.keys(this.preSetting)) {
            if (_.get(newSetting, key) !== this.preSetting[key]) {
              this.$store.commit('updateFileSetting', {
                uid: this.file.uid,
                setting: newSetting
              });
              break;
            }
          }
        },
        deep: true
      },
      price: {
        handler (newPrice) {
          if (newPrice) {
            this.setting = checkset(newPrice, this.setting);
          }
        },
        deep: true
      },
      preSetting (newSetting) {
        this.setting = {...newSetting};
      }
    },
    methods: {},
    computed: {
      colorable () {
        let setting = this.setting;
        return _.get(this.price, [setting.size, setting.caliper], {});
      },
      sideable () {
        let setting = this.setting;
        let sideable = _.get(this.price, [setting.size, setting.caliper, setting.color], {});
        if (!_.has(sideable, _.invert(this.sideMap)[setting.side])) {
          setting.side = _.get(this.sideMap, _.keys(sideable).shift(), 1);
        }
        return sideable;
      },
      sizeside: {
        get () {
          return JSON.stringify({
            size: this.setting.size,
            caliper: this.setting.caliper
          });
        },
        set (value) {
          this.setting = checkset(this.price, {
            ...this.setting,
            ...JSON.parse(value)
          });
        }
      },
      layout: {
        get () {
          let setting = this.setting;
          return setting.row * setting.col;
        },
        set (value) {
          Object.assign(this.setting, this.layouts[value]);
        }
      },
      total () {
        let setting = this.setting;
        return Math.ceil(
            (setting.endPage - setting.startPage + 1) / setting.side / this.layout
          ) * setting.copies;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../style/_animate"
  .print-file-item
    width: 1000px
    margin: 0 auto 16px

  .print-file
    position: relative
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
    .logo-holder
      position: absolute
      display: inline-block
      width: 100px
      height: 100%
      border-right: 1px dashed #ddd
      text-align: center
      .logo
        position: relative
        top: 50%
        margin-top: -40px
        img
          width: 55px
        div
          color: #666
          font-size: 14px
    .file-info
      position: absolute
      height: 80px
      top: 50%
      margin-top: -40px
      left: 120px
      line-height: 2em
      display: inline-block
      .name
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        max-width: 340px
      .source
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
    .control
      position: relative
      width: 120px
      height: 100px
      top: 50%
      margin: -45px auto
      font-size: 13px
      text-align: center
      z-index: 1
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

  .print-choice
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
    .selectors
      position: relative
      height: 28px
      margin-top: 10px
    .colors, .sides
      width: 85px
    .layouts, .copies
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
      .sizeside
        width: 160px
      & > span
        margin-right: 2px
    .print-area-input
      width: 43px

</style>
