<template>
  <div v-if="isOpen" @click="close" class="backdrop">
    <div class="payment-popup">
      <div class="payment-popup__content" @click.stop>
        <p class="payment-text">fake payment page</p>
        <button @click="buyItems" class="payment-button">PAY</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'addReviewPopup',
  data() {
    return {
    }
  },
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },
  emits: {
    close: null,
    send: null,
  },
  methods: {
    check() {
      console.log(this.itemId)
    },
    close() {
      this.$emit("close")
    },
    buyItems() {

    },
  },
  computed: {
    ...mapState({
    }),
  },
   mounted() {
     this.$store.dispatch('BUY_ITEMS')
   }
}

</script>

<style scoped>
.payment-popup {
  z-index: 2;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
}

.payment-text {
  text-align: center;
}

.payment-popup__content {
  background-color: #F0EBF4;
  display:  grid;
  justify-content: space-around;
  padding: 30px;
  width: 350px;
  height: 50vh;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  position: relative;
}

.payment-button {
  align-self: flex-end;
  cursor: pointer;
  border-radius: 5px;
  border-style: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  background-color: #1d903c;
  height: 45px;
  width: 200px;
  transition: background-color .2s ease-in-out;
  color: #F0EBF4;
  font-size: 25px;
}

.payment-button:hover {
  background-color: #22ad47;
}
</style>