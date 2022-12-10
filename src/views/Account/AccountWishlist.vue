<template>
  <div class="wishlist-page">
    <account-layout-category>
      <div class="wishlist">
        <div class="wishlist-header">
          <p class="wishlist-title">Wishlist</p>
        </div>
        <div class="wishlist-items">
          <ul class="item-list">
            <li v-for="item in wishlist" class="item-in-wishlist">
              <div @click="this.$router.push(`/${item.id}`)" class="wishlist-item__image">
                <img :src="`${item.image}`" class="wishlist-image" alt="bag">
              </div>
              <p class="item-price">
                ${{item.price}}
              </p>
              <p class="item-title">
                {{item.title}}
              </p>
              <div class="buttons-block">
                <button @click="addToWishlist(item.id)" class="like">
                  <img class="like-img" src="@/assets/icons/like.svg">
                </button>
                <button v-if="(isItemInBasket(item.id) == -1)" @click="basket" class="like">
                  <img class="add-img" src="@/assets/icons/addBasket.svg">
                </button>
                <button class="basket-button" v-if="(isItemInBasket(item.id) != -1)" @click="this.$router.push('/basket')">Go to the Basket</button>
              </div>
              {{ getSameTypeItems }}
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
    return {

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
  },

  computed: {
    ...mapState({
      wishlist: state => [...state.wishlist.wishlist],
      sameTypeItems: state => [...state.basket.sameTypeItems],
    }),
    getSameTypeItems() {
      this.$store.dispatch("GET_SAME_TYPE_ITEMS")
    }
  },

  mounted() {
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
  },

  // beforeUpdate() {
  //   this.$store.dispatch("GET_SAME_TYPE_ITEMS")
  // }
  
}
</script>

<style scoped>
.wishlist {
  margin: 10px 5% 40px 5%;
  padding: 10px 30px 10px 30px;
  background-color: #A1C3D1;
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

.item-list {
  margin: 0px;
  list-style-type: none;
  padding: 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-column-gap: 20px;
  justify-items: center;
  grid-row-gap: 20px;
}

.item-in-wishlist {
  align-self: center;
  border-radius: 10px;
  background-color: #F172A1;
}

.items-counter {
  display: flex;
  flex-direction: row;
}

.items-delete {
  cursor: pointer;
  transition: all .2s;
}

.wishlist-item__image {
  border-radius: 10px;
  cursor: pointer;
}

.item-title {
  padding: 0px 20px 0px 20px;
}

.item-price {
  font-weight: bold;
  padding: 0px 20px 0px 20px;
}

.wishlist-image {
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin: 20px;
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

.like-img:hover {
  scale: 1.05;
  filter: invert(0%) sepia(1%) saturate(609%) hue-rotate(318deg) brightness(92%) contrast(87%);
}

.like-img {
  transition: all .2s;
  filter: invert(25%) sepia(34%) saturate(3361%) hue-rotate(336deg) brightness(77%) contrast(110%);
}

.add-img {
  transition: all .2s;
}

.add-img:hover {
  filter: invert(41%) sepia(81%) saturate(459%) hue-rotate(84deg) brightness(91%) contrast(90%);
  scale: 1.05;
}


.buttons-block {
  padding: 10px 20px 10px 20px;
  display: flex;
  justify-content:space-between;
}

.basket-button {
  border: none;
  background-color: #1d903c;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: all .2s;
}

.basket-button:hover {
  scale: 1.05;
}
</style>