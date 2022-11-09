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
.main__image {
  width: 50px;
  height: auto;
}

.info__buttons {
  margin-right: 40px;
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all linear .2s;
}

.push{
  margin-left: auto;
}

.btn-in, 
.btn-up {
  border: none;
  border-radius: 7px;
  font-size: 15px;
  padding: 7px 15px;
  transition: color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
}

.btn-in {
  color: white;
  background-color: #111111;
}

.btn-up {
  color: black;
  background-color: #9ee0e6;
}

.info__buttons > li > a:hover,
.btn-in:hover,
.btn-up:hover {
  color: #4ba3ab;
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
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  height: 70px;
  grid-gap: 15px;
  font-size: 15px;
  text-transform: uppercase;
  padding-left: 40px;
  padding-right: 40px;
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
  height: 70px;
  background-color: #9ee0e6;
  text-align: center;
  object-fit: cover;
  transition: all linear .2s;
  border-radius: 5px;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
}

.btn:hover {
  background-color: #4ba3ab;
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
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

.menu__content {
  border-radius: 5px;
  right: 70px;
  display: none;
  position: absolute;
  background-color: #9ee0e6;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  cursor: pointer;
}

.menu__content a {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropbtn:hover,
.enter__bag:hover,
.user__menu:hover .dropbtn {
  filter: invert(56%) sepia(63%) saturate(351%) hue-rotate(137deg) brightness(91%) contrast(84%);
}
.menu__content a:hover {
  border-radius: 5px;
  background-color: #4BA3ABFF;
}
.user__menu:hover .menu__content {
  display: block;
}

.shopping__bag .enter__bag {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
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
  color: red;
  position: relative;
  top: -15px;
  right: -10px;
}
</style>