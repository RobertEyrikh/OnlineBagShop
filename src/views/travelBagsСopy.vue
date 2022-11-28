@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');
<template>
  <body>
  <app-layout-product-category>
  <main>
    <div>
      <div class="progress" :style="`width:${progress}px`"></div>
      <button v-if="isAdmin" class="postAdderVisible" @click="cancelButton()"><img src="../assets/addPost.svg"></button>
      <ul id="elem" >
        <transition-group class="all-items-card" name="list" tag="p">
          <li v-if="isAddPostVisible">
            <img class="inputImg" @click="" :src="`${imagePreview}`">
            <label class="inputBlock">
              <input 
                class="inputFile" required
                type="file"
                ref="file"
                name="file"
                accept=".jpg, .jpeg, .png, .svg" 
                v-bind:value="image"
                @change="handleFileUpload"
                @input="image = $event.target.value">
            </label>
            <div class="input">
            <p>Price:</p>
              <input 
                type="number" required
                v-bind:value="price"
                @input="price = $event.target.value">
            <p>Title:</p>
              <input required
                v-bind:value="title"
                @input="title = $event.target.value">
              <button class="cancel" @click=" cancelButton()">cancel</button>
            <button class="add" @click="createCard()">add</button>
            </div>
          </li>
          <li v-for="card in allItemsCard.data" :key="card.id">
            <div v-bind="card">
              <a href="#"><img :src="`${card.image}`" class="cardImage" alt="bag"></a>
              <div>
                <p>${{card.price}}</p>
                <a v-if="isAdmin" @click="editCard(card.id)" class="pushBucket"><img  class="bucket" src="../assets/icons/edit.svg"></a>
                <button class="product-interaction" v-if="!isAdmin"><img src="@/assets/icons/addBasket.svg"></button>
                <edit-popup :is-open="isEditOpen" @close="isEditOpen = false"/> 
              </div>
              <div class="titleAndDelete">
                <h1>{{card.title}}</h1>
                <button class="product-interaction" v-if="isAdmin"  @click="deleteItem(card.id)"><img src="../assets/delete.svg"></button>
                <button @click="setName()" class="product-interaction" v-if="!isAdmin"><img src="@/assets/icons/like.svg"></button>
              </div>
              </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </main>
  </app-layout-product-category>
  </body>
</template>

<script >
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
import {ItemsCard} from "@/components/ItemsCard";
import draggable from 'vuedraggable';
import {mapState} from 'vuex';
import EditPopup from "@/components/EditPopup.vue";
import imagePreview from '../mixins/imagePreview'

export default {
  name: "travelBagsCopy",
  mixins: [imagePreview],
  components: {AppLayoutProductCategory, draggable, EditPopup},
  data () {
    //let allItemsCard = new ItemsCardContainer([])
    return{
      image: '', price: '', ref: '', title: '', file:'',
      isAddPostVisible: false, 
      imagePreview: "add.svg",
      isEditOpen: false,
    }
  },

  methods: {
    editCard(id) {
      this.$store.commit('GET_CARD_ID', id)
      console.log(this.isAdmin)
      return this.isEditOpen = true
    },

    upadateItemsCard() {
      this.$store.dispatch("GET_ITEMS_FROM_API")
    },
    deleteItem(id) {
      this.$store.dispatch("DELETE_ITEM", id)
      .then (() => {
        console.log('item was deleted', id)
      })
    },
 
    createCard() {
      const itemCard = {
        image: this.file.name,
        price: this.price,
        id: this.id,
        title: this.title,
        shoppingBag: '../assets/shoppingBag.webp',
      }
      this.$store.commit("SET_IMAGE", this.file)
      //this.$store.commit("SET_ITEM", itemCard)
      this.$store.dispatch("POST_ITEMS_ON_API", itemCard)
      this.isAddPostVisible = !this.isAddPostVisible
    },

    cancelButton() {
      this.isAddPostVisible=!this.isAddPostVisible
      this.imagePreview = 'add.svg'
      this.title= ''
      this.price = ''
      this.id= ''
      this.image = ''
      this.upadateItemsCard()
    }, 
    
    setName() {
      this.$store.dispatch("PUSH_NAME")
    }
  },

  computed: {
    ...mapState({
      allItemsCard: state => state.getCard.allItemsCard,
      progress: state => state.addCard.progress,
      isAdmin: state => state.auth.admin
    }),
    
    getUser(){
      this.$store.dispatch("GET_ITEMS_FROM_API")
    }
  },

  mounted () {
    this.$store.dispatch("GET_ITEMS_FROM_API")
  }
}
</script>

<style scoped>
html,
body {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  border-radius: 10px;
}

body {
  padding: 12px;
}

main {
  margin-right: 40px;
  margin-top: 25px;
}

.all-items-card{
  list-style-type: none;
  display:flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;
  margin-left: auto;
  margin-top: 20px;
}

.all-items-card > li {
  height: 320px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  margin-bottom: 20px;
}

.progress {
  background-color: black;
  height: 10px;
  width: 10px;
}

.cardImage {
  background-color: #e3fbff;
  object-fit: cover;
  border-radius: 8px;
  width: 300px;
  height: 200px;
  transition: all linear .2s;
}

.cardImage:hover{
  transform: scale(1.05);
}

.all-items-card > li > div > div{
  display:flex;
  margin-left:auto;
  margin-right: 20px;
  align-items: center;
}

.titleAndDelete > h1 {
  margin-left: 15px;
  font-size: 15px;
}

.product-interaction {
  border: none;
  background-color: transparent;
  width: 40px;
  height: 30px;
  transition: all .2s;
  margin-left: auto;
  cursor: pointer;
}

.product-interaction:hover{
  transform: scale(1.1);
}

.pushBucket{
  margin-left: auto;
}

.bucket{
  width: 45px;
  height: 25px;
  transition: all linear .2s;
  cursor: pointer;
}

.bucket:hover{
  transform: scale(1.1);
}

.all-items-card > li > div > div > p {
  margin-left: 15px;
  font-size: 20px;
}


.input {
  margin-left: 15px;
  margin-right: 15px;
  display: grid;
  grid-row-gap: 20px;
  grid-row-gap: 15px;
  grid-template-rows: 35px 35px;
  grid-template-columns: 1fr 3fr;
  margin-bottom: 20px;
  box-shadow: none;
}

.input > input {
  display: block;
  border-style: none;
  border-radius: 5px;
  background-color: #e3fbff;
}

.add {
  justify-self: end;
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #9ee0e6;
  transition: background-color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
  margin-bottom: 10px;
}

.cancel {
  align-self: stretch;
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #ea7a7a;
  transition: background-color .2s ease-in-out;
  box-shadow: 2px 2px 4px #ea7a7a, -2px -2px 4px #f1cbcb;
  cursor: pointer;
  margin-bottom: 10px;;
}

.cancel:hover {
  background-color: #e35757;
}

.add:hover {
  background-color: #5cbec7;
}

.inputImg  {
  display: block;
  margin-left: auto;
  margin-right: auto;
  list-style-type: none;
  height: 160px;
  width: 160px;
  border: 0;
  text-indent: -9999px;
  cursor: pointer;
  transition: all linear .1s;
  margin-bottom: 10px;
  margin-top: 5px;
}

.postAdderVisible {
  transition: all linear .2s;
  margin-top: 10px;
  margin-left: 40px;
  border: none;
  outline: none;
  background-color: #9ee0e6;
  cursor: pointer;
}

.postAdderVisible:hover{
  transform: scale(1.15)
}

.postAdderVisible > img {
  height: 40px;
  width: 40px;
}

.inputFile {
  list-style-type: none;
  position: absolute;
  display: none;
  height: 400px;
  width: 400px;
}


.inputBlock:hover {
  opacity: 0.2;
  filter: invert(56%) sepia(63%) saturate(351%) hue-rotate(137deg) brightness(91%) contrast(84%);
}

.inputBlock {
  cursor: pointer;
  width: 160px;
  height: 160px;
  display: block;
  position: absolute;
  top: 282px;
  left: 138px;
  opacity: 0;
  border-radius: 5px;
  background-color: #9ee0e6;
  transition: opacity 0.2s ease-in-out;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>