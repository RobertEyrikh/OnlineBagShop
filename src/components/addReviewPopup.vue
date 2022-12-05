<template>
  <div v-if="isOpen" @click="close" class="backdrop">
    <div class="review-popup">
      <div class="review-popup__content" @click.stop>
        <h1>Item name</h1>
        <div class="rate-item">
          <p class="rate-item__title">Rate the item</p>
          <div class="rating-area">
            <input type="radio" id="star-5" name="rating" value="5" v-model="rate">
            <label for="star-5" title="Grade «5»"></label>
            <input type="radio" id="star-4" name="rating" value="4" v-model="rate">
            <label for="star-4" title="Grade «4»"></label>
            <input type="radio" id="star-3" name="rating" value="3" v-model="rate">
            <label for="star-3" title="Grade «3»"></label>
            <input type="radio" id="star-2" name="rating" value="2" v-model="rate">
            <label for="star-2" title="Grade «2»"></label>
            <input type="radio" id="star-1" name="rating" value="1" v-model="rate">
            <label for="star-1" title="Grade «1»"></label>
          </div>
        </div>  
        <div class="review-item">
          <div class="review-item__header">
            <p class="header__title">Tell about the product</p>
            <p class="header__length">{{this.review.length}}/400</p>
          </div>
          <textarea 
            class="review-item__body" 
            v-model="review"
            maxlength="400"
            >
          </textarea>
        </div> 
        <div class="review-item__buttons">
          <button class="cancel-button">Cancel</button>
          <button class="send-button" @click="sendFeedback">Send</button>
        </div>     
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addReviewPopup',
  data() {
    return{
      rate: '',
      review: '',
      itemId: this.itemId,
    }
  },
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
    itemId: {
      required: true,
      type: String,
    }
  },
  emits: {
    close: null,
    send: null,
  },
  methods: {
    close() {
      this.$emit("close")
    },
    sendFeedback() {      
      let feedbackBody = {
        itemId: this.itemId,
        rate: this.rate,
        review: this.review,
      }
      this.$store.dispatch('SEND_FEEDBACK_FOR_CHECK', feedbackBody)
    }
  }
}

</script>

<style scoped>
.review-popup {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
}

.review-popup__content {
  background-color: #F0EBF4;
  padding: 30px;
  width: 450px;
  height: 70vh;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.rate-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.review-item__body {
  border-radius: 5px;
  border-style: none;
  outline: none; 
  border: 0.5px solid #111;
  height: 270px;
  width: 100%;
  background-color:#F0EBF4;
  resize: none;
  box-sizing: border-box;
  padding: 20px;
  font-size: 16px;
}

.review-item__header {
  display: flex;
  justify-content: space-between;
}

.header__length {
  font-size: 13px;
}

.review-item__body:focus {
  border: 2px solid #F172A1;
}

.review-item__buttons {
  margin-top: 20px;
}

.cancel-button {
  border-radius: 10px;
  height: 40px;
  width: 80px;
  border: none;
  background-color: #A1C3D1;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all .2s;
}

.send-button {
  border-radius: 10px;
  height: 40px;
  width: 80px;
  margin-left: 20px;
  border: none;
  color: #F0EBF4;
  background-color: #F172A1;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all .2s;
}

.cancel-button:hover {
  background-color: #80a1b0;
}

.send-button:hover {
  background-color: #E64398;
}

.rating-area {
  overflow: hidden;
  width: 265px;
  margin: 0 ;
}

.rating-area:not(:checked)>input {
  display: none;
}

.rating-area:not(:checked)>label {
  float: right;
  width: 30px;
  padding: 0;
  cursor: pointer;
  font-size: 32px;
  line-height: 32px;
  color: lightgrey;
  text-shadow: 1px 1px #bbb;
}

.rating-area:not(:checked)>label:before {
  content: '★';
}

.rating-area>input:checked~label {
  color: #F172A1;
}

.rating-area:not(:checked)>label:hover,
.rating-area:not(:checked)>label:hover~label {
  color: #F172A1;
}

.rating-area>input:checked+label:hover,
.rating-area>input:checked+label:hover~label,
.rating-area>input:checked~label:hover,
.rating-area>input:checked~label:hover~label,
.rating-area>label:hover~input:checked~label {
  color: #F172A1;
}

.rate-area>label:active {
  position: relative;
}
</style>