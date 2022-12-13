@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');
<template>
  <app-layout-product-category>
    <main>
      <div>
        <div class="progress" :style="`width:${progress}px`"></div>
        <button v-if="isAdmin" class="postAdderVisible" @click="cancelButton()"><img src="../assets/addPost.svg"></button>
        <ul id="elem" class="all-items-card0">
          <!-- <transition-group class="all-items-card" name="list" tag="p"> -->
            <li v-if="isAddPostVisible" class="all-items-card">
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
          <!-- </transition-group> -->
          </ul>
          <get-items-card :category="`travelBags`">
          </get-items-card>  
      </div>
    </main>
  </app-layout-product-category>
</template>

<script >
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
import {ItemsCard} from "@/components/ItemsCard";
import draggable from 'vuedraggable';
import {mapState} from 'vuex';
import EditPopup from "@/components/EditPopup.vue";
import imagePreview from '../mixins/imagePreview'
import GetItemsCard from "@/components/GetItemsCard.vue";

export default {
  name: "travelBagsCopy",
  mixins: [imagePreview],
  components: { AppLayoutProductCategory, draggable, EditPopup, GetItemsCard },
  data () {
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
      // console.log(itemCard)
      this.$store.commit("SET_IMAGE", this.file)
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
    },

    addToBasket(id) {
      this.$store.dispatch("ADD_TO_BASKET", id)
    }
  },

  computed: {
    ...mapState({
      allItemsCard: state => state.getCard.allItemsCard,
      progress: state => state.addCard.progress,
      isAdmin: state => state.auth.admin
    }),
    
    // getUser(){
    //   this.$store.dispatch("GET_ITEMS_FROM_API")
    // }
  },

  // mounted () {
  //   this.$store.dispatch("GET_ITEMS_FROM_API")
  // }
}
</script>

<style scoped>
main {
  margin-top: 25px;
}

.all-items-card0{
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  gap: 20px;
  margin: 20px 5% 0px 5%;
  padding: 0;
}


.all-items-card {
  height: 320px;
  width: 300px;
  border-radius: 8px;
  margin: 0;
  background-color: #B39BC8;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  padding: 0;
}

.progress {
  background-color: black;
  height: 10px;
  width: 10px;
}

/* .cardImage {
  background-color: #e3fbff;
  object-fit: cover;
  border-radius: 8px;
  width: 300px;
  height: 200px;
  transition: all linear .2s;
}

.cardImage:hover{
  transform: scale(1.05);
} */

.all-items-card > div > div{
  display:flex;
  margin-left:auto;
  margin-right: 20px;
  align-items: center;
}

/* .titleAndDelete > h1 {
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
} */

.all-items-card > div > div > p {
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
  background-color: #F0EBF4;
}

.add {
  justify-self: end;
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #F0EBF4;
  transition: background-color .2s ease-in-out;

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

  cursor: pointer;
  margin-bottom: 10px;;
}

.cancel:hover {
  background-color: #E64398;
}

.add:hover {
  background-color: #F172A1;
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
  background-color: #F0EBF4;
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

/* .list-item {
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
} */
</style>