<template>
  <header class="header">
    <nav>
      <ul class="info__buttons">
        <li> <a href="/"><img class="main__image" src="../assets/logo.svg"></a></li>
        <li> <a href="/about">About </a> </li>
        <li> <a href="/services">Services</a> </li>
        <li> <a href="/delivery">Delivery</a> </li>
        <div class="push"> </div>
        <button v-if="!user" class= "btn-in" @click="isSignInOpen = true"> Sign in </button>
        <SignInPopup
          :is-open="isSignInOpen"
          @close= "isSignInOpen = false"
        >
        </SignInPopup>
        <button v-if="!user" class= "btn-up" @click="isSignUpOpen = true"> Sign up </button>
        <SignUpPopup
          :is-open="isSignUpOpen"
          @close= "isSignUpOpen = false"
        >
        </SignUpPopup>
        <div v-if="user" class="user__menu">
          <button class="dropbtn">
          </button>
          <div class="menu__content">
            <a @click="this.$router.push('/account')"> Account </a>
            <a href="#"> 
              <div v-if="user" @click="logout">Logout</div>
            </a>
          </div>
        </div>
        <div v-if="user" class="shopping__bag">
          <button class="enter__bag" @click="this.$router.push('/basket')">
            <a class="items__counter"><strong>0</strong></a>
          </button>
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
    return { isSignInOpen: false, isSignUpOpen: false };
  },
  methods: {
    logout() {
        this.$store.dispatch('logout')
        this.$router.push('/')
    },
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
  },
};
</script>

<style scoped>
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

.info__buttons {
  padding-left: 0px;
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all linear .2s;
  border-bottom: 1px solid #111;
  padding-bottom: 5px;
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
}

.btn-up {
  color: black;
  background-color: #F0EBF4;
}

.info__buttons > li > a:hover {
  color: #E64398;
}

.btn-in:hover,
.btn-up:hover {
  background-color: #F172A1;
}

.info__buttons > li > a {
  display:block;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color .1s ease-in-out;
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
  transform: scale(1.07);
}
.user__menu {
  float: left;
  overflow: hidden;
}

.dropbtn {
  background-repeat: no-repeat;
  background-image: url(../assets/userIcon.svg);
  transition: filter .1s ease-in-out;
}
.user__menu .dropbtn {
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
  color: #111;
  position: relative;
  top: -15px;
  right: -10px;
}
</style>