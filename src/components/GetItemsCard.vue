<template>
  <li v-for="card in allItemsCard.data" :key="card.id" class="items-card">
    <div v-bind="card">
      <a @click="this.$router.push(`/${card.id}`)"><img :src="`${card.image}`" class="cardImage" alt="bag"></a>
      <div class="wrapper">
        <div class="cardImage-body">
          <p>${{ card.price }}</p>
          <a v-if="isAdmin" @click="editCard(card.id)" class="pushBucket"><img class="bucket"
              src="../assets/icons/edit.svg"></a>
          <button  class="product-interaction" v-if="(!isAdmin && isItemInBasket(card.id) == -1)" @click="addToBasket(card.id)">
            <img src="@/assets/icons/addBasket.svg">
          </button>
          <button class="basket-button" v-if="(isItemInBasket(card.id) != -1)" @click="this.$router.push('/basket')">
            Go to the Basket
          </button>
          <edit-popup :is-open="isEditOpen" @close="isEditOpen = false" />
        </div>
        <div class="titleAndDelete">
          <h1>{{ card.title }}</h1>
          <button class="product-interaction" v-if="isAdmin" @click="deleteItem(card.id)">
            <img src="../assets/delete.svg">
          </button>
          <button @click="addToWishlist(card.id)" class="product-interaction" v-if="!isAdmin">
            <img :class="classObject(card.id)" src="@/assets/icons/like.svg">
          </button>
          {{ getSameTypeItems }}
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';
import EditPopup from "@/components/EditPopup.vue";

export default {
  name: "GetItemsCard",
  components: { EditPopup },
  data() {
    return {
      isEditOpen: false,
    }
  },
  methods: {
    isItemInBasket(id) {
      return this.sameTypeItems.indexOf(id)
    },
    editCard(id) {
      this.$store.commit('GET_CARD_ID', id)
      console.log(this.isAdmin)
      return this.isEditOpen = true
    },
    upadateItemsCard() {
      this.$store.dispatch("GET_ITEMS_FROM_API")
    },
    addToBasket(id) {
      this.$store.dispatch("ADD_TO_BASKET", id)
    },
    addToWishlist(id) {
      this.$store.dispatch("ADD_ITEM_TO_WISHLIST", id)
    },
    classObject(id) {
      return {
        active: this.wishlistItemsId.indexOf(id) !== -1
      }
    },
  },

  computed: {
    ...mapState({
      allItemsCard: state => state.getCard.allItemsCard,
      isAdmin: state => state.auth.admin,
      wishlistItemsId: state => [...state.wishlist.wishlistItemsId],
      sameTypeItems: state => [...state.basket.sameTypeItems],
    }),

    getSameTypeItems() {
      this.$store.dispatch("GET_SAME_TYPE_ITEMS")
    }
  },

  mounted() {
    this.$store.dispatch("GET_ITEMS_FROM_API")
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
  }
}


</script>


<style scoped>
.titleAndDelete,
.cardImage-body {
  padding-right: 15px;
  display: grid ;
  grid-template-columns: 3fr 1fr;
}

.active {
  filter: invert(25%) sepia(34%) saturate(3361%) hue-rotate(336deg) brightness(77%) contrast(110%);
}
.items-card {
  height: 320px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  background-color: #A1C3D1;
}
.titleAndDelete>h1 {
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

.product-interaction:hover {
  transform: scale(1.1);
}

.pushBucket {
  margin-left: auto;
}

.bucket {
  width: 45px;
  height: 25px;
  transition: all linear .2s;
  cursor: pointer;
}

.bucket:hover {
  transform: scale(1.1);
}

.cardImage {
  background-color: #e3fbff;
  object-fit: cover;
  border-radius: 8px;
  width: 300px;
  height: 200px;
  transition: all linear .2s;
  cursor: pointer;
}

.cardImage:hover {
  transform: scale(1.05);
}

.cardImage-body {
  margin-left:auto;
  align-items: center;
}

.cardImage-body > p {
  margin-left: 15px;
  font-size: 20px;
}

.basket-button {
  border: none;
  background-color: #1d903c;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  transition: all .2s;
  display: flex;
  justify-content: end;
}

.basket-button:hover {
  scale: 1.05;
}
</style>