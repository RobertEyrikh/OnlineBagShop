<template>
  <li v-for="card in allItemsCard.data" :key="card.id" class="items-card">
    <div v-bind="card">
      <a href="#"><img :src="`${card.image}`" class="cardImage" alt="bag"></a>
      <div class="wrapper">
        <div class="cardImage-body">
          <p>${{ card.price }}</p>
          <a v-if="isAdmin" @click="editCard(card.id)" class="pushBucket"><img class="bucket"
              src="../assets/icons/edit.svg"></a>
          <button class="product-interaction" v-if="!isAdmin" @click="addToBasket(card.id)">
            <img src="@/assets/icons/addBasket.svg"></button>
          <edit-popup :is-open="isEditOpen" @close="isEditOpen = false" />
        </div>
        <div class="titleAndDelete">
          <h1>{{ card.title }}</h1>
          <button class="product-interaction" v-if="isAdmin" @click="deleteItem(card.id)"><img
              src="../assets/delete.svg"></button>
          <button @click="addToWishlist(card.id)" class="product-interaction" v-if="!isAdmin"><img src="@/assets/icons/like.svg"></button>
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
    upadateItemsCard() {
      this.$store.dispatch("GET_ITEMS_FROM_API")
    },

    addToBasket(id) {
      this.$store.dispatch("ADD_TO_BASKET", id)
    },
    addToWishlist(id) {
      this.$store.dispatch("ADD_ITEM_TO_WISHLIST", id)
    }
  },

  computed: {
    ...mapState({
      allItemsCard: state => state.getCard.allItemsCard,
      isAdmin: state => state.auth.admin
    }),

    getUser() {
      this.$store.dispatch("GET_ITEMS_FROM_API")
    }
  },

  mounted() {
    this.$store.dispatch("GET_ITEMS_FROM_API")
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


.items-card {
  height: 320px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  margin-bottom: 20px;
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
}

.cardImage:hover {
  transform: scale(1.05);
}

.cardImage-body {
  display:flex;
  margin-left:auto;
  align-items: center;
}

.cardImage-body > p {
  margin-left: 15px;
  font-size: 20px;
}
</style>