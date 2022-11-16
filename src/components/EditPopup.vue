<template>
  <div v-if="isOpen" class="backdrop" @click="close" >
        <div class="popup" >
            <div class="popupContent" @click.stop >
                <img class="inputImg" @click="" :src="`${imagePreview}`">
              <label class="inputBlock">
                <input 
                  class="inputFile" 
                  type="file" 
                  ref="file" 
                  name="file" 
                  accept=".jpg, .jpeg, .png, .svg"
                  v-bind:value="image" 
                  @change="handleFileUpload" 
                  @input="image = $event.target.value">
              </label>
                <h1 >Price</h1>
                <my-input
                  type="number"
                  v-bind:value="price"
                  @input="price = $event.target.value"
                />
                <h2>Title</h2>
                <my-input
                  type="text"
                  v-bind:value="title"
                  @input="title = $event.target.value"
                />
                <my-button class="cancelButton" @click="close"> Cancel </my-button>
                <my-button class="applyButton" @click="edit"> Apply </my-button>
            </div>
        </div>
    </div>
</template>

<script>
import MyInput from './UI/MyInput.vue';
import MyButton from './UI/MyButton.vue';
import imagePreview from '../mixins/imagePreview'
  export default {
    name: 'EditPopup',
    mixins: [imagePreview],
    components: {
      MyInput,
      MyButton,
    },

    data() {
      return {
        imagePreview: "add.svg",
        price: '',
        title: '',
        file: '',
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
    edit: null,
  },
  methods: {
    editCard() {
      const editCard = {
        image: this.file.name,
        price: this.price,
        title: this.title,
      }
    },
 
    close() {
      this.$emit('close');
    },

    apply() {

    },
  },
}

</script>

<style>
.backdrop {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.3);
  top: 0;
  left: 0;
}

.popup {
  height: 100px;
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
}

.popupContent {
  background-color: #4ba3ab;
  color: #000;
  max-width: 500px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 2.5px 2.5px 6px #2f6a6f, -2.5px -2.5px 6px rgb(66, 146, 154);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3px;
  justify-items: center;
}

.popupContent>h1, h2 {
  grid-column: 1/3;
  text-align: center;
  font-size: 18px;
}

.cancelButton {
  grid-column: 1/2;
  width: 80px;
}

.applyButton {
  grid-column: 2/3;
  width: 80px;
}

.inputImg {
  grid-column: 1/3;
  list-style-type: none;
  height: 100px;
  width: 100px;
  border: 0;
  text-indent: -9999px;
  cursor: pointer;
  transition: all linear .1s;
  margin-bottom: 5px;
  margin-top: 5px;
}

.inputFile {
  list-style-type: none;
  position: absolute;
  display: none;
  height: 200px;
  width: 200px;
}


.inputBlock:hover {
  opacity: 0.3;
  filter: invert(56%) sepia(63%) saturate(351%) hue-rotate(137deg) brightness(91%) contrast(84%);
}

.inputBlock {
  cursor: pointer;
  width: 100px;
  height: 100px;
  display: block;
  position: absolute;
  top: 235px;
  left: 427px;
  opacity: 0;
  border-radius: 5px;
  background-color: #9ee0e6;
  transition: opacity 0.2s ease-in-out;
}
</style>