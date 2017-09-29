<template>
  <div>
    <modal-backdrop v-if="visible">
      <transition name="float-fade">
        <pay-dialog v-if="!paid"
                    :orderID="orderID"
                    :money="money"
                    @close="close"
                    @paid="onpaid">
        </pay-dialog>
        <paid-dialog v-else :money="money" :confirm="clearFiles"></paid-dialog>
      </transition>
    </modal-backdrop>
  </div>
</template>

<script>
  import modalBackdrop from '@/components/ModalBackdrop'
  import payDialog from './PayDialog'
  import paidDialog from './PaidDialog'

  export default {
    name: 'pay-box',
    props: {
      orderID: {
        required: true,
        type: String
      },
      money: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        visible: false,
        paid: false
      }
    },
    methods: {
      open () {
        this.visible = true;
      },
      close () {
        this.visible = false;
      },
      onpaid () {
        this.paid = true;
      },
      clearFiles () {
        this.$emit('paid');
      }
    },
    computed: {},
    components: {modalBackdrop, payDialog, paidDialog}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/style/_animate"
</style>
