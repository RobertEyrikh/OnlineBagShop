<template>
  <div v-if="isOpen" @click="close" class="backdrop">
    <div class="item-popup">
      <div class="item-popup__content" @click.stop>
        <div class="input-image">
          <img  class="input-image__img" :src="`${imagePreview}`">
        </div>
        <label class="input-block">
          <input id="inp" class="input-file" type="file" ref="file" name="file" accept=".jpg, .jpeg, .png, .svg"
            v-bind:value="image" @change="handleFileUpload" @input="image = $event.target.value">
        </label>
        <div class="select-category">
          <p>Select category</p>
          <select v-bind:value="category" @input="category = $event.target.value">
            <option>
              travel bags
            </option>
            <option>
              briefcases
            </option>
            <option>
              backpacks
            </option>
            <option>
              wallets
            </option>
            <option>
              belts
            </option>
          </select>
        </div>
        <div class="input-group">
          <div class="inpit-group__title">
            <p>Enter title</p>
            <input v-bind:value="title" @input="title = $event.target.value">
          </div>
          <div class="inpit-group__price">
            <p>Enter price</p>
            <input v-bind:value="price" @input="price = $event.target.value">
          </div>
        </div>
        <div class="input-description">
          <p>Enter description</p>
          <textarea v-bind:value="body" @input="body = $event.target.value" class="input-description__text"></textarea>
        </div>
        <div class="popup-buttons">
          <button class="cancel-button" @click="close">Cancel</button>
          <button @click="createCard" class="send-button">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import imagePreview from '../mixins/imagePreview'
export default {
  name: 'addReviewPopup',
  mixins: [imagePreview],
  data() {
    return{
      imagePreview: "add.svg",
      image: '', price: '', ref: '', title: '', file: '', category: '', body: '', id: ''
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
    close() {
      this.$emit("close")
    },
    createCard() {
      const itemCard = {
        image: this.file.name,
        price: this.price,
        id: '',
        title: this.title,
        category: this.category,
        body: this.body,
      }
      console.log(itemCard)
      this.$store.commit("SET_IMAGE", this.file)
      this.$store.dispatch("POST_ITEMS_ON_API", itemCard)
    },
    
  }
}
</script>

<style scoped>
p{
  margin-bottom: 5px;
}
.item-popup {
  z-index: 2;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
}

.item-popup__content {
  background-color: #F0EBF4;
  padding: 30px;
  width: 350px;
  height: 85vh;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  
}

.input-image {
  display: flex;
  justify-content: space-around;
}

.input-image__img {
  object-fit: cover;
  height: 200px;
  width: 200px;
  padding-left: auto;
  padding-right: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.input-block {
  margin-top: 10px;
}

.input-group {
  display: flex;
  justify-content:space-between;
}

.inpit-group__title {
  
}
.inpit-group__price {
  margin-left: 10px;
} 

.input-description__text {
  height: 150px;
  width: 344px;
  resize: none;
  margin-bottom: 10px;
}

.cancel-button {
  border-radius: 10px;
  height: 30px;
  width: 80px;
  border: none;
  background-color: #A1C3D1;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  transition: all .2s;
}

.send-button {
  border-radius: 10px;
  height: 30px;
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
</style>
