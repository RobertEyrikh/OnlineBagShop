@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600&display=swap');
<template>
  <body>
  <app-layout-product-category>
  <main>
    <div>
      <button class="addPostAdder" @click="cancelButton()"><img src="../assets/addPost.svg"></button>
      <ul id="elem" >
        <li v-if="isAddPostVisible">
          <img class="inputImg" @click="" v-bind:src="`${publicPath}${imagePreview}`" >
          <label class="inputBlock">
            <input 
              class="inputFile" required
              type="file"
              ref="file"
              name="file"
              accept="image/*"
              v-bind:value="image"
              v-on:change="handleFileUpload()"
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
          <!-- <button class="add" @click = "allItemsCard.newCardAdd(createCard), cancelButton()">add</button> -->
          <button class="add" @click="createCard()">add</button>
          </div>
        </li>
        <li v-for="card in allItemsCard.data">
          <div>
            <a href="#"><img class="cardImage" :src="`${publicPath}${card.image}`" alt="bag"></a>
            <div>
              <p>${{card.price}}</p>
              <a href="#" class="pushBucket"><img class="bucket" src="../assets/shoppingBag.webp"></a>
            </div>
            <div class="titleAndDelete">
              <h1>{{card.title}}</h1>
              <button  @click="allItemsCard.cardDelete(card.id)"><img src="../assets/delete.svg"></button>
            </div>
            </div>
        </li>
      </ul>
    </div>
  </main>
  </app-layout-product-category>
  </body>
</template>

<script >
import renderItemCard from "@/components/RenderItemCard";
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
import {ItemsCard} from "@/components/ItemsCard";
import ItemsCardContainer from "@/components/ItemsCardContainer";
import draggable from 'vuedraggable';
import {mapActions, mapState} from 'vuex';

export default {
  name: "travelBagsCopy",
  components: {AppLayoutProductCategory, renderItemCard, draggable},
  data () {
    let allItemsCard = new ItemsCardContainer([])

    return{ publicPath: process.env.BASE_URL,
      image: '', price: '', ref: '', title: '', file:'',
      allItemsCard,
      isAddPostVisible: false, imagePreview: "add.svg",
      
    }
  },

  methods: {
    handleFileUpload(){
      this.file = this.$refs.file.files[0];

      let reader = new FileReader();

      reader.addEventListener("load", function () {
        this.imagePreview = this.file.name;
      }.bind(this), false);
      reader.readAsDataURL(this.file);

      return(this.file.name)
     },
 
    createCard() {
      this.$store.state.addCard.item =  new ItemsCard( {
        image: this.handleFileUpload(),
        price: this.price,
        id: Date.now(),
        title: this.title,
        shoppingBag: '../assets/shoppingBag.webp',
      })
      this.$store.dispatch("POST_ITEMS_ON_API")

    },

    cancelButton() {
      this.isAddPostVisible=!this.isAddPostVisible
      this.imagePreview = 'add.svg'
      this.title= ''
      this.price = ''
      this.id= ''
      this.image = ''
    },
    
  },
  computed: {
    // ...mapState ({
    //   item: state => state.addCard.item
    // }),
  },
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

main > div > ul{
  list-style-type: none;
  display:flex;
  flex-wrap: wrap;
  align-items: stretch;
  /*justify-content: space-between;*/
  gap: 20px;
  margin-left: auto;
  margin-top: 20px;
}

main > div > ul > li {
  height: 320px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  margin-bottom: 20px;
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

#elem > li > div > div{
  display:flex;
  margin-left:auto;
  margin-right: 20px;
  align-items: center;
}

.titleAndDelete > h1 {
  margin-left: 15px;
  font-size: 15px;
}

.titleAndDelete > button {
  border: none;
  background-color: transparent;
  width: 40px;
  height: 30px;
  transition: all linear .2s;
  margin-left: auto;
  cursor: pointer;
}

.titleAndDelete > button:hover{
  transform: scale(1.2);
}

.pushBucket{
  margin-left: auto;
}

.bucket{
  width: 40px;
  height: 30px;
  transition: all linear .2s;
}

.bucket:hover{
  transform: scale(1.2);
}

#elem > li > div > div > p {
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

.addPostAdder {
  transition: all linear .2s;
  margin-top: 10px;
  margin-left: 40px;
  border: none;
  outline: none;
  background-color: #9ee0e6;
  cursor: pointer;
}

.addPostAdder:hover{
  transform: scale(1.15)
}

.addPostAdder > img {
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
</style>