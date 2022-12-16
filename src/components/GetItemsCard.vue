<template>
  <h5 class="sort"> Sorted by:
    <select v-model="currentSort" class="sort-select">
      <option class="sort-option">Featured</option>
      <option class="sort-option">Price: Low to Hight</option>
      <option class="sort-option">Price: Hight to Low</option>
    </select>
  </h5>
  <ul v-if="!getCategory().data" id="elem" class="all-items-card0">
    <li v-for="card in aggregator" class="items-card">
      <div class="loader"></div>
    </li>
  </ul>
  <ul id="elem" class="all-items-card0">
    <li v-for="card in getCategory().data" :key="card.id" class="items-card">
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
  </ul>
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
      aggregator: [1, 1, 1, 1, 1, 1],
      currentSort: 'Featured',
      currentArrayOfItems: [],     
    }
  },
  props: {
    category: {
      required: true,
      type: String,
    }
  },
  methods: {
    getCategory() {
      switch(this.category) {
        case 'travelBags': return this.currentArrayOfItems = this.travelBags
        case 'wallets': return this.currentArrayOfItems = this.wallets
        case 'belts': return this.currentArrayOfItems = this.belts
        case 'briefcases': return this.currentArrayOfItems = this.briefcases
        case 'backpacks': return this.currentArrayOfItems = this.backpacks
      } 
    },
    isItemInBasket(id) {
      return this.sameTypeItems.indexOf(id)
    },
    editCard(id) {
      this.$store.commit('GET_CARD_ID', id)
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
      wallets: state => state.getCard.wallets,
      travelBags: state => state.getCard.travelBags,
      briefcases: state => state.getCard.briefcases,
      backpacks: state => state.getCard.backpacks,
      belts: state => state.getCard.belts,
      isAdmin: state => state.auth.admin,
      wishlistItemsId: state => [...state.wishlist.wishlistItemsId],
      sameTypeItems: state => [...state.basket.sameTypeItems],
    }),

    getSameTypeItems() {
      this.$store.dispatch("GET_SAME_TYPE_ITEMS")
    }
  },
  watch: {
    currentSort(newValue) {
      this.getCategory().data.sort((item1, item2) => {
        if(newValue == 'Price: Low to Hight') {
          if (+item1.price < +item2.price) return - 1
        }
        if (newValue == 'Price: Hight to Low') {
          if (+item1.price > +item2.price) return - 1
        }        
      })
      if (newValue == 'Featured') {
        this.getCategory()
      }
    }
  },
  mounted() {
    //this.$store.dispatch("GET_ITEMS_FROM_API", this.category)
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
    this.$store.dispatch("GET_ITEMS_BY_CATEGORY", this.category)
  }
}
</script>

<style scoped>
.sort {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 2%;
}

.sort-select {
  border-radius: 5px;
  border: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .04);
  height: 25px;
  color: #e3fbff;
  background-color: #F172A1;
  outline: none;
  cursor: pointer;
}

.sort-select::-ms-expand {
  display: none;
}

.sort-option:hover {
  background-color: #E64398;
}
.all-items-card0 {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  gap: 20px;
  margin: 10px 2% 20px 2%;
  padding: 20px;
  border-radius: 50px;
  background-color: #a1c3d1;
}

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
  display: flex;
  height: 320px;
  width: 300px;
  border-radius: 8px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  background-color: #B39BC8;
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

@keyframes loader-spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  display: flex;
  border: 15px solid rgba(0, 0, 0, 0.1);
  border-left-color: #F172A1;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: loader-spin 2s linear infinite;
  align-self: center;
  margin-left: 90px
}
</style>