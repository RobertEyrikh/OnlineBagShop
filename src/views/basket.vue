<template>
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
            <div @click="this.$router.push(`/${item.id}`)" class="item-image">
              <img :src="`${item.image}`" class="image" alt="bag">
            </div>
            <p class="item-title">
              {{ item.title }}
            </p>
          </li>
        </ul>
        <div class="items-counter">
          <button @click="removeOneItem(item.id)" class="button-counter">
            <img class="button-counter__img" src="@/assets/icons/minus.svg">
          </button>
          <p class="counter-value">
            {{ this.itemsQty[item.id] }}
          </p>
          <button @click="addOneItem(item.id)" class="button-counter">
            <img class="button-counter__img" src="@/assets/icons/plus.svg">
          </button>
          <p @click="removeSameTypesItems(item.id)" class="items-delete">Delete</p>
        </div>
        <div class="price">
          ${{ item.price * this.itemsQty[item.id] }}
        </div>
      </div>
    </div>
    <div class="delivery">
      <div class="delivery-title">
        <p>
          Delivery methods
        </p>
        <button @click="isEditAdress = !isEditAdress" class="change-adress">
          change
        </button>
      </div>
      <div  class="delivery-adress" >
        <p>Your adress:</p>
        <p v-if="!isEditAdress"> {{ this.adress }}</p>
        <div class="input-block" v-if="isEditAdress">
          <input class="input__field" v-model="newAdress">
          <button @click="isEditAdress = !isEditAdress, changeAdress()" class="edit"><img
              src="@/assets/icons/check.svg"></button>
          <button @click="isEditAdress = !isEditAdress" class="edit"><img src="@/assets/icons/cancel.svg"></button>
        </div>
      </div>
    </div>
    <div class="payment">
      <div class="total total-sum">
        <p>Total &nbsp</p>
        <p>
          {{ getTotalAmount }}
        </p>
      </div>
      <div class="total">
        <p>Number of product: &nbsp</p>
        <p>{{ getTotalQty }}</p>
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
</template>

<script>
import { mapState } from 'vuex';
import AppLayoutProductCategory from "../layouts/AppLayoutProductCategory.vue";
export default {
  name: 'basket',
  components: { AppLayoutProductCategory },

  data() {
    return {
      newAdress: '',
      price: [],
      isEditAdress: false,
    }
  },
  methods: {
    changeAdress() {
      this.$store.dispatch("CHANGE_ADRESS", this.newAdress)
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
      itemsQty: state => state.basket.itemsQty,
      adress: state => state.userInfo.adress,
    }),
    getTotalAmount() {
      let price = 0
      for(let i = 0; i < this.basket.length; i ++) {
        price += this.basket[i].price * this.itemsQty[this.basket[i].id]
      }
      return price
    },
    getTotalQty() {
      let Qty = 0
      for (let i = 0; i < this.basket.length; i++) {
        Qty +=  this.itemsQty[this.basket[i].id]
      }
      return Qty
    }
  },

  mounted() {
    this.$store.dispatch("GET_BASKET")
    this.$store.dispatch("GET_ITEMS_QTY")
    return this.$store.dispatch("GET_USER_INFO")
  }
}
</script>

<style>
.basket {
  margin: 5%;
  padding: 10px 30px 10px 30px;
  background-color: #A1C3D1;
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

/* .checkbox-input {
} */

.checkbox__text {
  color: rgb(38, 38, 38);
  font-size: 10px;
}

.basket-items {
  flex-wrap: wrap;
  padding: 25px 0px 25px 0px;
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
  filter: invert(59%) sepia(13%) saturate(2349%) hue-rotate(293deg) brightness(101%) contrast(89%);
}

.image {
  object-fit: cover;
  height: 130px;
  width: 130px;
  margin-right: 10px;
  border-radius: 10px;
  cursor: pointer;
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
  filter: invert(59%) sepia(13%) saturate(2349%) hue-rotate(293deg) brightness(101%) contrast(89%);
}

/* .button-counter__img {

} */

.price {
  font-size: 25px;
  font-weight: bold;
}

.delivery {
  margin: 5%;
  padding: 10px 30px 10px 30px;
  background-color: #A1C3D1;
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
  background-color: #B39BC8;
  height: 25px;
  transition: background-color .2s ease-in-out;
}

.change-adress:hover{
  background-color: #F172A1;
}

.delivery-adress {
  display: flex;
  justify-content: space-between;
}

.payment {
  margin: 5%;
  padding: 10px 30px 10px 30px;
  background-color: #F172A1;
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
  color: #F0EBF4;
  font-size: 25px;
}
.button-order:hover {
  background-color: #22ad47;
}
.edit {
  max-height: 25px;
  max-width: 35px;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  transition: all .2s;
  margin-left: 10px;
  margin-right: 10px;
}

.input__field {
  width: 120px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  outline: none;
  transition: all .2s;
  border: 2px solid #A1C3D1
}

.input__field:hover {
  border: 2px solid #F172A1
}

.edit > img {
  height: 20px;
  width: 20px;
}

.edit:hover {
  filter: invert(59%) sepia(13%) saturate(2349%) hue-rotate(293deg) brightness(101%) contrast(89%);
}

.edit {
  max-height: 25px;
  max-width: 35px;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  transition: all .2s;
  margin-left: 10px;
  margin-right: 10px;
}

.input__field {
  width: 120px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  outline: none;
  transition: all .2s;
  border: 2px solid #A1C3D1
}

.input__field:hover {
  border: 2px solid #F172A1
}

.edit>img {
  height: 20px;
  width: 20px;
}

.edit:hover {
  filter: invert(59%) sepia(13%) saturate(2349%) hue-rotate(293deg) brightness(101%) contrast(89%);
}

.input-block {
  display: flex;
  justify-content: end;
}
</style>