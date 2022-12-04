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
          <div class="buttons-block">
            <button @click="addToWishlist(thisItem.id)" class="like">
              <img class="like-img" src="@/assets/icons/like.svg">
            </button>
            <button  @click="basket" class="like">
              <img class="add-img" src="@/assets/icons/addBasket.svg">
            </button>
            <button class="basket-button"  @click="this.$router.push('/basket')">Go to the
              Basket</button>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  </app-layout-product-category>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
import { mapState } from 'vuex';
export default {
  components: { AppLayoutProductCategory },
  name: "ThisItem",

  data() {
    return {
      id: this.$route.params['id']
    }
  },
  methods: {
    methods: {
      addToWishlist(id) {
        this.$store.dispatch("ADD_ITEM_TO_WISHLIST", id)
      },
      basket() {
        console.log(this.sameTypeItems)
      },
      isItemInBasket(id) {
        return this.sameTypeItems.indexOf(id)
      }
    },
  },

  computed: {
    ...mapState({
      thisItem: state => state.getCard.thisItem,
      wishlist: state => [...state.wishlist.wishlist],
      sameTypeItems: state => [...state.basket.sameTypeItems],
    }),
  },

  mounted() {
    this.$store.dispatch('GET_THIS_ITEM', this.id)
  },
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

.description-text__price {
  font-size: 20px;
  font-weight: bold;
}

/* .button-counter {
  border: none;
  outline: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  transition: all .2s;
}

.button-counter:hover {
  filter: invert(59%) sepia(13%) saturate(2349%) hue-rotate(293deg) brightness(101%) contrast(89%);
} */
</style>