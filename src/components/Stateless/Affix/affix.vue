<template>
  <div :style="placeholderStyle">
    <div :class="classNames" ref="fixedNode" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import { throttle } from '@/utils/tools'

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
    return isWindow ? target[prop] : target[method]
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
      left: elemRect.left - targetRect.left + scrollLeft - clientLeft,
      width: elemRect.width,
      height: elemRect.height
    }
  }

  function pixelate (obj) {
    if (!obj) return null
    let pixelWise = {}
    for (let key in obj) {
      pixelWise[key] = obj[key] + 'px'
    }
    return pixelWise
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
        ],
        onUpdatePosition: throttle(this.updatePosition, 50)
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
        affixStyle = pixelate(affixStyle)
        const { onChange, target } = this
        const originalAffixStyle = pixelate(this.affixStyle)
        const isWindow = target === window
        if (e.type === 'scroll' && originalAffixStyle && affixStyle && isWindow) return
        if (_.isEqual(affixStyle, originalAffixStyle)) return
        this.affixStyle = affixStyle
        if (!affixStyle ^ !originalAffixStyle) onChange(!!affixStyle)
      },
      setPlaceholderStyle (placeholderStyle) {
        placeholderStyle = pixelate(placeholderStyle)
        const originalPlaceholderStyle = pixelate(this.placeholderStyle)
        if (_.isEqual(placeholderStyle, originalPlaceholderStyle)) return
        this.placeholderStyle = placeholderStyle
      },
      setTargetEventListeners (target) {
        this.clearEventListeners(target)
        this.events.forEach(eventName => {
          target.addEventListener(eventName, this.onUpdatePosition, false)
        })
      },
      clearEventListeners (target) {
        this.events.forEach(eventName => {
          target.removeEventListener(eventName, this.onUpdatePosition, false)
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
          bottom: scrollTop + targetInnerHeight < elemOffset.top + elemSize.height + (offsetBottom || 0)
        }

        offsetMode.top = offsetMode.top && !_.isNumber(offsetBottom)
        offsetMode.bottom = offsetMode.bottom && _.isNumber(offsetBottom)

        let affixStyle = {
          left: targetRect.left + elemOffset.left,
          width: elemOffset.width
        }

        function getTop (enable) {
          if (!enable) return null
          const top = targetRect.top + offsetTop
          return { top }
        }

        function getBottom (enable) {
          if (!enable) return null
          const targetBottomOffset = target === window ? 0 : (window.innerHeight - targetRect.bottom)
          const bottom = targetBottomOffset + offsetBottom
          return { bottom }
        }

        if (offsetMode.top || offsetMode.bottom) {
          this.setAffixStyle(e, {
            ...affixStyle,
            ...getTop(offsetMode.top),
            ...getBottom(offsetMode.bottom),
          })
          this.setPlaceholderStyle({
            width: elemOffset.width,
            height: elemSize.height
          })
        } else {
          this.setAffixStyle(e, null)
          this.setPlaceholderStyle(null)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "./affix"
</style>
