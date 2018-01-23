<template>
  <transition name="left-fade">
    <section class="print-file-item">
      <div class="print-file" :class="{'file-upload': !upsuccess}">
        <div class="valid-index" v-if="index">{{`#${index}`}}</div>
        <div class="processor" v-if="!upsuccess">
          <div class="process-bar" :style="{width: `${file.percentage}%`}"></div>
          <div class="loading-info">
            <div class="uploading">
              <template v-if="file.percentage != 100">
                <div>正在上传</div>
                <div class="percentage">
                  <span class="loading">
                    <spinDot></spinDot>
                  </span>
                  {{file.percentage.toFixed(1)}}%
                </div>
                <div class="speed">剩余 {{file.remain || '...'}} 秒 / {{file.speed || 0}} kb/s</div>
              </template>
              <template v-else>
                <div>上传完毕</div>
                <div class="analysing">正在分析...</div>
              </template>
            </div>
          </div>
        </div>
        <div class="logo-holder">
          <div class="logo"><img :src="fileIcon[file.raw.extension]">
            <div v-if="upsuccess">{{`${file.pageInfo.pageCount}页`}}</div>
            <div v-else>{{Math.ceil(file.size / 1024)}}kb</div>
          </div>
        </div>
        <div class="file-info">
          <div class="name">{{file.name}}</div>
          <div class="source"><span>来源：<span>{{file.raw.origin}}</span></span></div>
        </div>
        <div class="fade-in" v-if="upsuccess">
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
                    <template v-if="!file.pageInfo.isVertical">
                      <el-option label="4合1" :value="4"></el-option>
                      <el-option label="6合1" :value="6"></el-option>
                      <el-option label="8合1" :value="8"></el-option>
                      <el-option label="9合1" :value="9"></el-option>
                    </template>
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
          <div class="setting">
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
                                 :max="file.pageInfo.pageCount">
                </el-input-number>
              </span>
            </div>
            <div class="print-area">
              <span>纸张</span>
              <el-select class="sizeside" v-model="sizeside">
                <el-option v-for="{size, caliper} of price"
                           :label="`${size} ${caliper} 白纸`"
                           :value="JSON.stringify({size, caliper})"
                           :key="`${size} ${caliper}`">
                </el-option>
                <el-option v-if="!price"
                           :label="`${setting.size} ${setting.caliper} 白纸`"
                           :value="sizeside">
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
  import _ from 'lodash'
  import { icons } from '@/assets/img/print'
  import spinDot from '$@/Stateless/SpinDot'
  import { sideMap, checkset } from '@/utils/print'

  export default {
    name: 'print-file-item',
    components: { spinDot },
    props: {
      price: {
        default: null
      },
      index: {
        type: Number,
        default: null
      },
      file: {
        type: Object,
        required: true
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
        setting: {
          ...checkset(
            this.price,
            this.preSetting
          )
        },
        layouts: {
          1: { row: 1, col: 1 },
          2: { row: 2, col: 1 },
          4: { row: 2, col: 2 },
          6: { row: 3, col: 2 },
          8: { row: 4, col: 2 },
          9: { row: 3, col: 3 }
        },
        sideMap: sideMap,
        fileIcon: icons
      }
    },
    computed: {
      upsuccess () {
        let file = this.file
        return _.get(file, 'status') === 'success' && _.get(file, ['pageInfo', 'pageCount'])
      },
      colorable () {
        let setting = this.setting
        if (!this.price) return {}
        for (let { size, caliper, money } of this.price) {
          if (setting['size'] === size && setting['caliper'] === caliper) {
            return money
          }
        }
        return {}
      },
      sideable () {
        let setting = this.setting
        let sideable = _.get(this.colorable, setting.color, {})
        if (!_.has(sideable, _.invert(this.sideMap)[setting.side])) {
          setting.side = _.get(this.sideMap, _.keys(sideable).shift(), 1)
        }
        return sideable
      },
      sizeside: {
        get () {
          return JSON.stringify({
            size: this.setting.size,
            caliper: this.setting.caliper
          })
        },
        set (value) {
          this.setting = checkset(this.price, {
            ...this.setting,
            ...JSON.parse(value)
          })
        }
      },
      layout: {
        get () {
          let setting = this.setting
          return setting.row * setting.col
        },
        set (value) {
          let { row, col } = this.layouts[value]
          if (this.file.pageInfo.isVertical) {
            [row, col] = [col, row]
          }
          Object.assign(this.setting, { row, col })
        }
      },
      total () {
        let setting = this.setting
        return Math.ceil(
          (setting.endPage - setting.startPage + 1) / setting.side / this.layout
        ) * setting.copies
      }
    },
    watch: {
      setting: {
        handler (newSetting) {
          for (let key of _.keys(this.preSetting)) {
            if (_.get(newSetting, key) !== this.preSetting[key]) {
              this.$emit('update', {
                uid: this.file.uid,
                setting: newSetting
              })
              break
            }
          }
        },
        deep: true
      },
      price: {
        handler (newPrice) {
          if (newPrice) {
            this.setting = checkset(newPrice, this.setting)
          }
        },
        deep: true
      },
      preSetting: {
        handler (newSetting) {
          this.setting = { ...newSetting }
        },
        deep: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./print-file-item"
</style>
