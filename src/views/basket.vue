<template>
  <div class="basket-page">
    <app-layout-product-category> 
      <div class="basket">
        <div class="basket-header">
          <p class="basket-title">Basket</p>
          <div class="checkbox">
            <input class="checkbox-input" type="checkbox">
            <p class="">Choose all</p>
          </div>         
        </div>
        <div v-for="item in basket" class="basket-items">
          <ul class="items-list">
            <li class="item">    
              <div class="item-image">
                <img :src="`${item.image}`" class="image" alt="bag">
              </div>                        
              <p class="item-title">
                {{item.title}}
              </p>
            </li>
          </ul>          
          <div class="items-counter">
            <button @click="removeOneItem(item.id)" class="button-counter">
              <img class="button-counter__img" src="@/assets/icons/minus.svg">
            </button>
            <p class="counter-value">
              1
            </p>
            <button @click="addOneItem(item.id)" class="button-counter">
              <img class="button-counter__img" src="@/assets/icons/plus.svg">
            </button>
            <p @click="removeSameTypesItems(item.id)" class="items-delete">Delete</p>
          </div>
          <div class="price">
            {{'$' + item.price}}
          </div>
        </div>        
      </div>
      <div class="delivery">
        <div class="delivery-title">
          <p>
            Delivery methods
          </p>
          <button class="change-adress">
            change
          </button>
        </div>
        <div class="delivery-adress">
          <p>Your adress:</p>
          <p> NY grand ave. building 45, apt.  62</p>
        </div>
      </div>
      <div class="payment">   
        <div class="total total-sum">
          <p>Total &nbsp</p>
          <p>1900</p>
        </div>   
        <div class="total">
          <p>Number of product: &nbsp</p>
          <p>2</p>
        </div>       
        <button class="button-order">Order</button>
        <div class="checkbox">
          <input class="checkbox-input" type="checkbox">
          <p class="checkbox__text">
            Agree with return conditions
          </p>
        </div>
      </div>
    </app-layout-product-category> 
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppLayoutProductCategory from "../layouts/AppLayoutProductCategory.vue";
export default {
  name: 'basket',
  components: { AppLayoutProductCategory },

  data() {
    return {
      
    }
  },
  methods: {
    info() {
      console.log(this.basket)
    },
    removeOneItem(id) {
      this.$store.dispatch('REMOVE_ONE_ITEM', id)
    },
    addOneItem(id) {
      this.$store.dispatch('ADD_TO_BASKET', id)
    },
    removeSameTypesItems(id) {
      this.$store.dispatch('REMOVE_SAME_TYPES_ITEMS', id)
    }
  },

  computed: {
    ...mapState({
      basket: state => [...state.basket.basket],
    }),
  },

  mounted() {
    this.$store.dispatch("GET_BASKET")
    this.$store.dispatch("GET_ITEMS_QTY")
  }

}
</script>

<style scooped>
.basket-page {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  border-radius: 10px;
  padding-top: 20px;
}

.basket {
  margin: 5%;
  background-color: red;
  padding: 10px 30px 10px 30px;
  background-color: #85c9cf;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.basket-header {
  border-bottom: 1px solid rgb(95, 95, 95) ;
}

.basket-title {
  font-size: 25px;
  margin-bottom: 0px;
}

.checkbox {
  display: flex;
}

.checkbox-input {
}

.checkbox__text {
  color: rgb(38, 38, 38);
  font-size: 10px;
}

.basket-items {
  flex-wrap: wrap;
  padding: 50px 0px 50px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center
}

.items-list {
  margin: 0px;
  list-style-type: none;
  padding: 0px
}

.item {
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center
}

.items-counter{
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

.image {
  object-fit: cover;
  height: 100px;
  width: 100px;
  margin-right: 10px;
}

.counter-value {
  width: 20px;
  align-self: center;
  justify-self: center;
}

.button-counter {
  border: none;
  outline: none;
  background-color: transparent;
  height: 50px;
  width: 50px;
  transition: all .2s;
}
.button-counter:hover {
  filter: invert(10%) sepia(64%) saturate(5365%) hue-rotate(243deg) brightness(94%) contrast(113%);
}

.button-counter__img {

}

.price {
  font-size: 25px;
  font-weight: bold;
}

.delivery {
  margin: 5%;
  background-color: red;
  padding: 10px 30px 10px 30px;
  background-color: #85c9cf;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  align-items: center
}

.delivery-title {
  display: flex;
  justify-content: space-between;
  font-size: 25px;
}

.change-adress {
  align-self: center;
  cursor: pointer;
  border-radius: 5px;
  border-style: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  background-color: #85c9cf;
  height: 25px;
  transition: background-color .2s ease-in-out;
}

.change-adress:hover{
  background-color: #2f6a6f;
}

.delivery-adress {
  display: flex;
  justify-content: space-between;
}

.payment {
  margin: 5%;
  padding: 10px 30px 10px 30px;
  background-color: #85c9cf;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  align-items: flex-start;
  display: flex;
  flex-direction: column;
}

.total {
  display: flex;
}

.total-sum {
  font-weight: bold;
  font-size: 20px;
}

.button-order {
  align-self: center;
  cursor: pointer;
  border-radius: 5px;
  border-style: none;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  background-color: #1d903c;
  height: 45px;
  width: 200px;
  transition: background-color .2s ease-in-out;
  color: rgb(214, 212, 212);
  font-size: 25px;
}
.button-order:hover {
  background-color: #22ad47;
}
</style>