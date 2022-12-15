<template>
  <header class="header">
    <nav @click="!isSearchOpen">
      <ul class="header__title">
        <div class="header-links">
          <li> <a href="/"><img class="main__image" src="../assets/logo.svg"></a></li>
          <li> <a href="/about">About </a> </li>
          <li> <a href="/services">Services</a> </li>
          <li> <a href="/delivery">Delivery</a> </li>
        </div>
        <div class="header-search">
          <input @click="isSearchOpen = true" v-model.trim="searchValue" @input="search(searchValue)" class="search" placeholder="Enter product name">
          <div v-if="isSearchOpen" class="searching-results">
            <div v-for="item in foundsItems">
              <router-link :to = "`/${item.id}`" class="foundItem">{{item.title}}</router-link>
            </div>
          </div>
          <!-- <button class="search-button" @click="search(searchValue)"><img class="search-button__img" src="@/assets/icons/search.svg"></button> -->
        </div>
        <div class="header-buttons">
          <button v-if="!user" class="btn-in" @click="isSignInOpen = true"> Sign in </button>
          <SignInPopup :is-open="isSignInOpen" @close="isSignInOpen = false">
          </SignInPopup>
          <button v-if="!user" class="btn-up" @click="isSignUpOpen = true"> Sign up </button>
          <SignUpPopup :is-open="isSignUpOpen" @close="isSignUpOpen = false">
          </SignUpPopup>
          <div v-if="isAdmin" class="admin-block">
            <button @click="this.$router.push('/adminPanel')" class="devtools-btn">Devtools</button>
            <button @click="logout" class="logout-btn">Logout</button>
          </div>
          <div v-if="(user && !isAdmin)" class="user__menu">
            <button class="dropbtn">
            </button>
            <div class="menu__content">
              <a @click="this.$router.push('/account')"> Account </a>
              <a href="#">
                <div v-if="user" @click="logout">Logout</div>
              </a>
            </div>
          </div>
          <div v-if="(user && !isAdmin)" class="shopping__bag">
            <button class="enter__bag" @click="this.$router.push('/basket')">
              <a class="items__counter"><strong>{{ getTotalQty() }}</strong></a>
            </button>
          </div>
        </div>
      </ul>
    </nav>
    <div>
      <div class="btn-block">
        <a @click='this.$router.push("/travelBagsCopy")'><div class="btn"><img src="../assets/bag.svg"> Travel bags </div></a>
        <a @click='this.$router.push("/briefcases")'><div class="btn"><img src="../assets/briefcase.svg"> Briefcases </div></a>
        <a href="/backpacks"><div class="btn"><img src="../assets/backpack.svg"> Backpacks </div></a>
        <a href="/wallets"><div class="btn"><img src="../assets/wallet.svg"> Wallets </div></a>
        <a href="/belts"><div class="btn"><img src="../assets/belt.svg"> Belts </div></a>
      </div>
    </div>
  </header>
</template>

<script>
import SignInPopup from "../components/SignInPopup.vue";
import SignUpPopup from "../components/SignUpPopup.vue";
import { useStore, mapState } from 'vuex';

export default {
  name: "TheHeader",
  components: { SignInPopup, SignUpPopup },
  data() {
    return { 
      isSignInOpen: false,
      isSignUpOpen: false,
      qty: 0, 
      searchValue: '',
      isSearchOpen: false,
    };
  },
  methods: {
    search(str) {
      this.$store.dispatch("GET_ITEMS_BY_NAME", str)
    },
    logout() {
      this.$store.dispatch('logout')
      this.$router.push('/')
      this.$store.commit('SET_COMMENTS_TO_NULL')
      this.$store.commit('SET_PENDING_COMMENTS_TO_NULL')
    },
    getTotalQty() {
      let qty = 0
      for (let i = 0; i < this.basket.length; i++) {
        qty += this.itemsQty[this.basket[i].id]
      }
      return qty
    }
  },
  computed: {
    ...mapState({
      foundsItems: state => state.search.foundsItems,
      basket: state => [...state.basket.basket],
      user: state => state.auth.user,
      isAdmin: state => state.auth.admin,
      itemsQty: state => state.basket.itemsQty,
    }),
  },
  mounted() {
    this.$store.dispatch("GET_ITEMS_QTY")
    this.$store.dispatch("GET_BASKET")
  }
};
</script>

<style scoped>
.devtools-btn {
  border-radius: 10px;
  height: 30px;
  width: 100px;
  border: none;
  background-color: #B39BC8;
  transition: all .2s;
  cursor: pointer;
}

.devtools-btn:hover {
  background-color: #F172A1;
}

.logout-btn {
  border-radius: 10px;
  margin-left: 15px;
  height: 30px;
  width: 100px;
  border: none;
  cursor: pointer;
  transition: all .2s;
  color: #F0EBF4;
  background-color: #111;
}

.logout-btn:hover {
  background-color: #F172A1;
}

.header {
  padding-bottom: 0px;
  margin: 0px 2% 0px 2%;
  background-color: #A1C3D1;
  padding: 20px 30px 20px 30px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
}
.main__image {
  width: 50px;
  height: auto;
}

.header__title {
  padding-left: 0px;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  align-items: center;
  gap: 15px;
  transition: all linear .2s;
  border-bottom: 1px solid #111;
  padding-bottom: 5px;
}

.header-links {
  display: flex;
  align-items: center;
}

.header-search {
  position: relative;
  /* display: flex; */
}

.search-button {
  border: none;
  background-color: inherit;
}

.search-button__img:hover {
  filter: invert(62%) sepia(60%) saturate(1682%) hue-rotate(298deg) brightness(100%) contrast(89%);
}

.search-button__img {
  height: 30px;
  width: 30px;
  transition: all .2s;
}

.search {
  width: 290px;
  height: 30px;
  border-radius: 10px;
  opacity: 40%;
  border-style: none;
  transition: all ease-in-out .4s;
}

.searching-results {
  overflow:auto;
  position: absolute;
  background-color: #F0EBF4;
  border-radius: 10px;
  height: 120px;
  width: 290px;
}

.search:focus {
  opacity: 100%;
  box-shadow: 0.3px 0.3px 0.3px 0.3px rgba(0, 0, 0, 0.2);
  outline: none;
}

.foundItem {
  margin: 0;
  padding: 5px;
  border-radius: 10px;
}

.foundItem:hover {
  background-color: #F172A1;
  cursor: pointer;
}
.header-buttons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.push{
  margin-left: auto;
}

.btn-in, 
.btn-up {
  border: none;
  border-radius: 10px;
  font-size: 15px;
  padding: 7px 15px;
  transition: all .2s ease-in-out;
  cursor: pointer;
}

.btn-in {
  color: #F0EBF4;
  background-color: #111111;
  margin-right: 20px;
}

.btn-up {
  color: black;
  background-color: #F0EBF4;
}

.header-links > li > a:hover {
  color: #E64398;
}

.btn-in:hover,
.btn-up:hover {
  background-color: #F172A1;
}

.header-links > li > a {
  display:block;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color .1s ease-in-out;
  padding-right: 10px;
}

.btn-block{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 15px;
  font-size: 15px;
  text-transform: uppercase;
}

.btn-block img {
  display: block;
  object-fit: cover;
  width: 20%;
  max-height: 100%;
  margin-left: auto;
  margin-right: auto;
}

.btn-block > a {
  text-decoration: none;
  color: black;
}

.btn{
  padding: 10px;
  background-color: #B39BC8;
  text-align: center;
  object-fit: cover;
  transition: all linear .2s;
  border-radius: 20px;
  box-shadow: 0.3px 0.3px 0.3px 0.3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.btn:hover {
  background-color: #F172A1;
}
.user__menu {
  float: left;
  overflow: hidden;
}

.dropbtn {
  background-repeat: no-repeat;
  background-image: url(../assets/userIcon.svg);
  transition: filter .1s ease-in-out;
  margin-right: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  color: #F0EBF4;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
}
.user__menu {
  font-size: 16px;
  border: none;
  outline: none;
  color: #F0EBF4;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.menu__content {
  border-radius: 10px;
  right: 70px;
  display: none;
  position: absolute;
  background-color: #F172A1;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
  color: #F0EBF4;
}

.menu__content a {
  float: none;
  color: #F0EBF4;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropbtn:hover,
.enter__bag:hover,
.user__menu:hover .dropbtn {
  filter: invert(62%) sepia(60%) saturate(1682%) hue-rotate(298deg) brightness(100%) contrast(89%);
}
.menu__content a:hover {
  border-radius: 10px;
  background-color: #E64398;
}
.user__menu:hover .menu__content {
  display: block;
}

.shopping__bag .enter__bag {
  font-size: 16px;
  border: none;
  outline: none;
  color: #F0EBF4;
  padding: 14px 16px;
  background-color: inherit;
  margin: 0;
}

.enter__bag {
  max-width: 34px;
  max-height: 34px;
  background-repeat: no-repeat;
  background-image: url(../assets/basket.svg);
  cursor: pointer;
}

.items__counter {
  font-size: 20px;
  color: rgb(168, 0, 0);
  position: relative;
  top: -15px;
  right: -10px;
}
</style>