<template>
  <modal-backdrop v-if="visible">
    <transition name="float-fade">
      <pay-dialog v-if="!paid"
                  :orderID="orderID"
                  :money="money"
                  @close="close"
                  @paid="onpaid">
      </pay-dialog>
      <paid-dialog v-else :money="money" @confirm="confirmPaid"></paid-dialog>
    </transition>
  </modal-backdrop>
</template>

<script>
  import modalBackdrop from '@/components/ModalBackdrop';
  import payDialog from './PayDialog';
  import paidDialog from './PaidDialog';

  export default {
    name: 'pay-box',
    components: { modalBackdrop, payDialog, paidDialog },
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
        paid: false,
        result: {
          resolve () {},
          reject () {}
        }
      };
    },
    methods: {
      open () {
        this.visible = true;
        return new Promise((resolve, reject) => {
          this.result = { resolve, reject };
        });
      },
      close () {
        this.result.reject();
        this.visible = false;
        this.$nextTick(this.$destroy);
      },
      onpaid () {
        this.paid = true;
      },
      confirmPaid () {
        this.result.resolve('paid');
        this.close();
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~@/style/_animate"
</style>
