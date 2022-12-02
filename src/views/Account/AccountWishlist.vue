<template>
  <div class="wishlist-page">
    <account-layout-category>
      <div class="wishlist">
        <div class="wishlist-header">
          <p class="wishlist-title">Wishlist</p>
        </div>
        <div class="wishlist-items">
          <ul class="items-list">
            <li v-for="item in wishlist" class="item">
              <div class="item-image">
                <img :src="`${item.image}`" class="image" alt="bag">
              </div>
              <p class="item-price">
                ${{item.price}}
              </p>
              <p class="item-title">
                {{item.title}}
              </p>
              <div class="buttons">
                <button class="like">
                  <img src="@/assets/icons/like.svg">
                </button>
                <button class="like">
                  <img src="@/assets/icons/addBasket.svg">
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </account-layout-category>
  </div>
</template>

<script>
import AccountLayoutCategory from "@/layouts/AccountLayout"
import { mapState } from "vuex";
export default {
  name: "AccountWishlist",
  components: { AccountLayoutCategory },

  data() {
    return {}
  },

  computed: {
    ...mapState({
      wishlist: state => [...state.wishlist.wishlist],
    }),
  },

  mounted() {
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
  }
  
}
</script>

<style scooped>
.wishlist {
  margin: 5%;
  background-color: red;
  padding: 10px 30px 10px 30px;
  background-color: #85c9cf;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.wishlist-header {
  border-bottom: 1px solid rgb(95, 95, 95);
}

.wishlist-title {
  font-size: 25px;
  margin-bottom: 0px;
}

.checkbox {
  display: flex;
}

.checkbox-input {}

.checkbox__text {
  color: rgb(38, 38, 38);
  font-size: 10px;
}

.wishlist-items {
  padding: 50px 0px 50px 0px;
}

.items-list {
  margin: 0px;
  list-style-type: none;
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 20px;
  justify-items: center;
}

.item {
  align-self: center;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.items-counter {
  display: flex;
  flex-direction: row;
}

.items-delete {
  cursor: pointer;
  transition: all .2s;
}

.items-delete:hover {
  filter: invert(10%) sepia(64%) saturate(5365%) hue-rotate(243deg) brightness(94%) contrast(113%);
}

.item-image {
  border-radius: 5px;
}

.item-title {
  padding: 0px 20px 0px 20px;
}

.item-price {
  font-weight: bold;
  padding: 0px 20px 0px 20px;
}

.image {
  object-fit: cover;
  height: 200px;
  width: 200px;
  border-radius: 5px;
  padding: 20px 20px 20px 20px;
}

.like {
  border: none;
  outline: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  transition: all .2s;
}

.like:hover {
  filter: invert(10%) sepia(64%) saturate(5365%) hue-rotate(243deg) brightness(94%) contrast(113%);
}

.buttons {
  padding: 0px 20px 0px 20px;
  display: flex;
  justify-content:space-between;
}
</style>