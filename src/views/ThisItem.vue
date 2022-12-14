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
            {{thisItem.body}}
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
        <div class="comment-grade">
          <div class="rating-result">
            <span :class="{ active: averageRating >= 1}"></span>
            <span :class="{ active: averageRating >= 2}"></span>
            <span :class="{ active: averageRating >= 3}"></span>
            <span :class="{ active: averageRating >= 4}"></span>
            <span :class="{ active: averageRating >= 5}"></span>
            {{averageRating}}
          </div>
        </div>
        <add-review-popup :is-open="isPopupOpen" :itemId="thisItem.id" @close="isPopupOpen = false"/>
        <ul class="comments-list">
          <li class="comment-body" v-if="arrayOfComments.length == 0">
            <p >No comments yet, add yours!</p>
          </li>
          <li v-for="comment in arrayOfComments" :key="comment.comment"  class="comment-body">
            <div class="comment-body__title">
              <p class="comment-email">{{ getUserInfoByUid(comment.userId) }}</p>
              <p class="comment-data">10.08.2022</p>
            </div>
            <div class="comment-grade">
              <div class="rating-result">
                <span :class="{ active: comment.rate >= 1}"></span>
                <span :class="{ active: comment.rate >= 2}"></span>
                <span :class="{ active: comment.rate >= 3}"></span>
                <span :class="{ active: comment.rate >= 4}"></span>
                <span :class="{ active: comment.rate >= 5}"></span>
              </div>
            </div>
            <div class="comment-body__text">
              <p>{{comment.comment}}</p>
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
      itemId: '1',
    }
  },
  methods: {   
    addToWishlist(id) {
      this.$store.dispatch("ADD_ITEM_TO_WISHLIST", id)
    },
    check(id) {
      console.log(this.users[id])
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
    getUserInfoByUid(id) {
      if (this.users[id]) {
        if (this.users[id].name) {
          return this.users[id].name
        } else return this.users[id].email       
      }    
    }
  },

  computed: {
    ...mapState({
      thisItem: state => state.getCard.thisItem,
      wishlist: state => [...state.wishlist.wishlist],
      wishlistItemsId: state => [...state.wishlist.wishlistItemsId],
      sameTypeItems: state => [...state.basket.sameTypeItems],
      isAdmin: state => state.auth.admin,
      arrayOfComments: state => state.reviews.arrayOfComments,
      users: state => state.userInfo.users
    }),
    getSameTypesBasket() {
      this.$store.dispatch("GET_SAME_TYPE_ITEMS")
    },
    averageRating() {
      if(this.arrayOfComments.length > 0) {
        let result = this.arrayOfComments.reduce(function(sum, elem) {
          return sum += +elem.rate
        }, 0);
        return result / this.arrayOfComments.length
      }
    }
  },

  mounted() {
    this.$store.dispatch('GET_THIS_ITEM', this.id)
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
    this.$store.dispatch("GET_REVIEWS_OF_ITEM", this.id)
    this.$store.dispatch("GET_ALL_USERS")
  },
}
</script>

<style scoped>
.rating-result {
  width: 265px;
  margin: 0;
}

.rating-result span {
  padding: 0;
  font-size: 24px;
  margin: 3px 0px;
  line-height: 1;
  color: #A1C3D1;
}

.rating-result>span:before {
  content: '???';
}

.rating-result>span.active {
  color: #B39BC8;
}
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
  height: auto;
  width:100%;
  height: 100%;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.item-description__text {
  position: relative;
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
  position: absolute;
  bottom: 20px;
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
  margin-right: 40px;
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
  margin-bottom: 15px;
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