<template>
  <app-layout-product-category>
    <div class="item-body">
      <h1 class="item-title"> {{thisItem.title}}</h1>
      <div class="item-description">
        <div class="item-description__image">
          <img class="item-image" :src="`${thisItem.image}`" alt="bag">
        </div>
        <div class="item-description__text">
          <h2 class="description-text">
            {{thisItem.title}}
          </h2>
          <p class="description-text description-text__price">
            price: ${{thisItem.price}}
          </p>
          <p class="description-text description-body">
            {{thisItem.title}}
          </p>
        
          <div class="buttons-block">
            <button 
            v-if=!isAdmin
              @click="addToWishlist(id)" 
              class="like"
              :class="classObject(thisItem.id)"
              >
              <img class="like-img" src="@/assets/icons/like.svg">
            </button>
            <button  
              v-if="(!isAdmin && isItemInBasket(thisItem.id) == -1)"
              @click="addToBasket(thisItem.id)" 
              class="like"
              >
              {{getSameTypesBasket}}
              <img class="add-img" src="@/assets/icons/addBasket.svg">
            </button>
            <button 
              class="basket-button"  
              @click="this.$router.push('/basket')"
              v-if="(isItemInBasket(thisItem.id) != -1)"
              >
              Go to the Basket
            </button>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="comments-header">
          <p class="comments-title">Feedback</p>
          <button @click="isPopupOpen=true" class="add-comment">Add a review</button>
        </div>
        <add-review-popup :is-open="isPopupOpen" :itemId="thisItem.id" @close="isPopupOpen = false"/>
        <ul class="comments-list">
          <li class="comment-body">
            <div class="comment-body__title">
              <p class="comment-email">Email</p>
              <p class="comment-data">10.08.2022</p>
            </div>
            <div class="comment-grade">
              10/10
            </div>
            <div class="comment-body__text">
              <p>This item is very impressive. I was like it.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </app-layout-product-category>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
import { mapState } from 'vuex';
import addReviewPopup from "@/components/addReviewPopup.vue";
export default {
  components: { AppLayoutProductCategory, addReviewPopup },
  name: "ThisItem",

  data() {
    return {
      id: this.$route.params['id'],
      isPopupOpen: false,
      itemId: '',
    }
  },
  methods: {
    addToWishlist(id) {
      this.$store.dispatch("ADD_ITEM_TO_WISHLIST", id)
    },
    basket() {
      console.log(this.sameTypeItems)
    },
    isItemInBasket(id) {
      return this.sameTypeItems.indexOf(id)
    },
    classObject(id) {
      return {
        active: this.wishlistItemsId.indexOf(id) !== -1
      }
    },
    addToBasket(id) {
      this.$store.dispatch("ADD_TO_BASKET", id)
    },
  },

  computed: {
    ...mapState({
      thisItem: state => state.getCard.thisItem,
      wishlist: state => [...state.wishlist.wishlist],
      wishlistItemsId: state => [...state.wishlist.wishlistItemsId],
      sameTypeItems: state => [...state.basket.sameTypeItems],
      isAdmin: state => state.auth.admin
    }),
    getSameTypesBasket() {
      this.$store.dispatch("GET_SAME_TYPE_ITEMS")
    }
  },

  mounted() {
    this.$store.dispatch('GET_THIS_ITEM', this.id)
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
  },

  // beforeUpdate() {
  //   this.$store.dispatch("GET_SAME_TYPE_ITEMS")
  // }
}
</script>

<style scoped>
.item-body{
  margin: 10px 2% 40px 2%;
  padding: 10px 30px 10px 30px;
  background-color: #A1C3D1;
  border-radius: 50px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.item-description {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 15px;
  padding-bottom: 40px;
}

.item-image {
  box-sizing: border-box;
  object-fit: cover;
  height: 100%;
  width:auto;
  max-width:100%;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.item-description__text {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #B39BC8;
  padding: 15px;
}

.description-text {
  text-align: left;
  margin-left: 0px;
  font-size: 25px;
}

.description-body {
  height: 250px
}

.description-text__price {
  font-size: 20px;
  font-weight: bold;
}

.buttons-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.like {
  border: none;
  object-fit: cover;
  outline: none;
  background-color: transparent;
  height: 40px;
  width: 40px;
  transition: all .2s;
  padding: 0;
  cursor: pointer;
}

.basket-button {
  border: none;
  outline: none;
  background-color: #22ad47;
  height: 50px;
  width: 100px;
  transition: all .2s;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.basket-button:hover {
  background-color: #1d903c;
}

.active {
  filter: invert(25%) sepia(34%) saturate(3361%) hue-rotate(336deg) brightness(77%) contrast(110%);
}

.comments {
  background-color: #B39BC8;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 15px;
}

.comments-header {
  display: flex;
}

.comments-title{
  font-size: 18px;
}

.add-comment{
  border: none;
  outline: none;
  background-color: #22ad47;
  height: 30px;
  width: 100px;
  transition: all .2s;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  align-self: center;
  margin-left: 100px;
}

.add-comment:hover{
  background-color: #1d903c;
}

.comment-body {
  background-color: #F172A1;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  list-style-type: none;
  padding: 15px;
}

.comments-list {
  margin-left: 0;
  padding-left: 0;
}

.comment-body__title {
  display: flex;
  border-bottom: 1px solid black;
}

.comment-email {
  padding-right: 20px;
}

.comment-grade {
  padding-top: 10px;
}
</style>