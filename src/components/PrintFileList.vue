<template>
  <div class="queue-simple">
    <div class="PrintFileItem">
      <div class="Print_file">
        <div class="valid-index">#1</div>
        <div class="logoHolder">
          <div class="logoPos"><img src="http://zyin-v4-public.oss-cn-shenzhen.aliyuncs.com/images/icon-word-1.png">
            <div>6页</div>
          </div>
        </div>
        <div class="fileInf">
          <div class="Name">科技创新创业苗子项目科技创新创业苗子工程申报指南.docx</div>
          <div class="kejian-tip"></div>
          <div class="Sourse"><span>来源：<span>本地上传</span></span></div>
        </div>
        <div class="fadeIn">
          <div class="delete">
            <div class="Com_del">
              <div class="tip">共需打印 6 张纸</div>
              <div class="right-btn">
                <el-button class="del-btn" icon="fa-file-text-o">&nbsp;打印预览</el-button>
              </div>
              <div class="right-btn">
                <el-button class="del-btn" icon="delete2">&nbsp;移除文件</el-button>
              </div>
            </div>
          </div>
          <div class="Print_file_printChoice">
            <ul>
              <li>
                <div>色彩</div>
                <div class="choiceSelect">
                  <el-select value="黑白" style="width: 85px;">
                    <el-option label="黑白" value="黑白"></el-option>
                    <el-option label="彩色" value="彩色" :disabled="true"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>单双面</div>
                <div class="choiceSelect">
                  <el-select value="单面" style="width: 85px;">
                    <el-option label="单面" value="单面"></el-option>
                    <el-option label="双面" value="双面"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>多合一</div>
                <div class="choiceSelect">
                  <el-select value="单面"  style="width: 80px;">
                    <el-option label="1合1" value="单面"></el-option>
                    <el-option label="双面" value="双面"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <div>份数</div>
                <div class="choiceSelect">
                  <el-input-number class="choiceNum" value="1"  :min="1" :max="100"></el-input-number>
                </div>
              </li>
            </ul>
          </div>
          <div id="heightSetContent" class="setting">
            <div class="print-area">
              <span class="area-tip">打印范围 </span>
              <span class="lingkage-are">
                <el-input-number class="print-area-input" :controls="false" value="0"  :min="0" :max="100"></el-input-number>
                <span>-</span>
                <el-input-number class="print-area-input" :controls="false" value="1"  :min="1" :max="100"></el-input-number>
              </span>
            </div>
            <div class="print-area">
              <span style="margin-right: 2px;">纸张</span>
              <el-select value="A4 70g 白纸"  style="width: 160px;">
                <el-option label="A4 70g 白纸" value="A4 70g 白纸"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'print-file-list',
    data () {
      return {}
    },
    methods: {},
    components: {}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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
      &>div
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
