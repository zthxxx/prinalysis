<template>
  <div :style="placeholderStyle">
    <div :class="classNames" ref="fixedNode" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'

  const className = 'affix'

  function getTargetRect (target) {
    return target === window ?
      { top: 0, left: 0, bottom: 0 } :
      target && target.getBoundingClientRect()
  }

  function getScroll (target, top) {
    const prop = top ? 'pageYOffset' : 'pageXOffset'
    const method = top ? 'scrollTop' : 'scrollLeft'
    const isWindow = target === window
    let ret = isWindow ? target[prop] : target[method]
    return ret
  }

  function getOffset (element, target) {
    const elemRect = element.getBoundingClientRect()
    const targetRect = getTargetRect(target)

    const scrollTop = getScroll(target, true)
    const scrollLeft = getScroll(target, false)

    const docElem = window.document.body
    const clientTop = docElem.clientTop || 0
    const clientLeft = docElem.clientLeft || 0

    return {
      top: elemRect.top - targetRect.top + scrollTop - clientTop,
      left: elemRect.top - targetRect.left + scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height
    }
  }

  export default {
    name: 'affix',
    props: {
      offsetTop: {
        type: Number,
        default: 0
      },
      offsetBottom: {
        type: [Number, null],
        default: null
      },
      target: {
        type: [Window, HTMLElement],
        default () { return window }
      },
      onChange: {
        type: Function,
        default () {
          return () => {}
        }
      }
    },
    data () {
      return {
        fixedNode: null,
        placeholderStyle: null,
        affixStyle: null,

        offsetTop: 0,
        offsetBottom: 0,

        events: [
          'resize',
          'scroll',
          'touchstart',
          'touchmove',
          'touchend',
          'pageshow',
          'load'
        ]
      }
    },
    computed: {
      classNames () {
        return {
          [className]: this.affixStyle
        }
      }
    },
    watch: {
      target (nextTarget, prevTarget) {
        console.log('target next = prev', nextTarget === prevTarget)
        if (nextTarget !== prevTarget) {
          this.clearEventListeners(prevTarget)
          this.setTargetEventListeners(nextTarget)
          this.updatePosition({})
        }
      }
    },
    mounted () {
      this.fixedNode = this.$refs.fixedNode
      this.setTargetEventListeners(this.target)
    },
    beforeDestroy () {
      this.clearEventListeners(this.target)
    },
    methods: {
      setAffixStyle (e, affixStyle) {
        const { onChange, target } = this
        const originalAffixStyle = this.affixStyle
        const isWindow = target === window
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) return
        if (_.isEqual(affixStyle, originalAffixStyle)) return
        this.affixStyle = affixStyle
        if (!affixStyle ^ !originalAffixStyle) onChange(!!affixStyle)
      },
      setPlaceholderStyle (placeholderStyle) {
        const orginalPlaceholderStyle = this.placeholderStyle
        if (_.isEqual(placeholderStyle, orginalPlaceholderStyle)) return
        this.placeholderStyle = placeholderStyle
      },
      setTargetEventListeners (target) {
        this.clearEventListeners(target)
        this.events.forEach(eventName => {
          target.addEventListener(eventName, this.updatePosition, false)
        })
      },
      clearEventListeners (target) {
        this.events.forEach(eventName => {
          target.removeEventListener(eventName, this.updatePosition, false)
        })
      },
      updatePosition (e) {
        let { offsetTop, offsetBottom, target } = this
        const scrollTop = getScroll(target, true)
        const affixNode = this.$el
        const elemOffset = getOffset(affixNode, target)
        const elemSize = {
          width: this.fixedNode.offsetWidth,
          height: this.fixedNode.offsetHeight
        }

        const targetRect = getTargetRect(target)
        const targetInnerHeight = target.innerHeight || target.clientHeight

        let offsetMode = {
          top: scrollTop > elemOffset.top - offsetTop,
          bottom: scrollTop < elemOffset.top + elemSize.height + (offsetBottom || 0) - targetInnerHeight
        }

        offsetMode.top = offsetMode.top && !_.isNumber(offsetBottom)
        offsetMode.bottom = offsetMode.bottom && _.isNumber(offsetBottom)


        if (offsetMode.top) {
          const width = elemOffset.width
          const top = targetRect.top + offsetTop
          this.setAffixStyle(e, {
            position: 'fixed',
            top,
            left: targetRect.left + elemOffset.left,
            width
          })
          this.setPlaceholderStyle({
            width,
            height: elemSize.height
          })
        } else if (offsetMode.bottom) {
          const targetBottomOffet = target === window ? 0 : (window.innerHeight - targetRect.bottom)
          const width = elemOffset.width
          this.setAffixStyle(e, {
            position: 'fixed',
            bottom: targetBottomOffet + offsetBottom,
            left: targetRect.left + elemOffset.left,
            width
          })
          this.setPlaceholderStyle({
            width,
            height: elemOffset.height
          })
        } else {
          const { affixStyle } = this
          if (e.type === 'resize' && affixStyle && affixStyle.position === 'fixed' && affixNode.offsetWidth) {
            this.setAffixStyle(e, { ...affixStyle, width: affixNode.offsetWidth })
          } else {
            this.setAffixStyle(e, null)
          }
          this.setPlaceholderStyle({})
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./affix"
</style>
