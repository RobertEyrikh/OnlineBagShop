<template>
  <header class="header">
    <nav>
      <ul>
        <li><a href="/"><img src="../assets/logo.svg"></a></li>
        <li> <a href="/about">About </a> </li>
        <li> <a href="/project">Project </a> </li>
        <li> <a href="/services">Services</a> </li>
        <li> <a href="/delivery">Delivery</a> </li>
        <div class="push"> </div>
        <button class= "btn-in" @click="isSignInOpen = true"> Sign in </button>
        <SignInPopup
          :is-open="isSignInOpen"
          @close= "isSignInOpen = false"
          @logIn = "SignInPopupConfirmed"
        >
        </SignInPopup>
        <button class= "btn-up" @click="isSignUpOpen = true"> Sign up </button>
        <SignUpPopup
          :is-open="isSignUpOpen"
          @close= "isSignUpOpen = false"
          @logIn = "SignUpPopupConfirmed"
        >
        </SignUpPopup>
      </ul>
    </nav>
    <div>
      <div class="btn-block">
        <a href="/travelBags"><div class="btn1"><img src="../assets/bag.svg"> Travel bags </div></a>
        <a href="/briefcases"><div class="btn"><img src="../assets/briefcase.svg"> Briefcases </div></a>
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

export default {
  name: "TheHeader",
  components: { SignInPopup, SignUpPopup },
  data() {
    return { isSignInOpen: false, isSignUpOpen: false };
  },
  methods: {
    SignInPopupConfirmed() {
      alert ("confirmed");
    },
    SignUpPopupConfirmed() {
      alert("confirmed");
    },
  },
};
</script>

<style scoped>
header > nav > ul > li > a > img {
  width: 50px;
  height: auto;
}

header > nav > ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all linear .2s;
}

.push{
  margin-left: auto;
}

.btn-in {
  border: none;
  border-radius: 7px;
  color: white;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #111111;
  transition: color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
}

.btn-up {
  border: none;
  border-radius: 7px;
  color: black;
  font-size: 15px;
  padding: 7px 15px;
  background-color: #9ee0e6;
  transition: color .2s ease-in-out;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  cursor: pointer;
}

.btn-in:hover {
  color: #4ba3ab;
}

.btn-up:hover {
  color: #4ba3ab;
}

header > nav > ul > li > a {
  display:block;
  text-transform: uppercase;
  text-decoration: none;
  color: #111;
  transition: color .2s ease-in-out;
}

header > nav > ul > li > a:hover {
  color: #4ba3ab;
  transform: scale(1.1);
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

.btn1{
  height: 70px;
  background-color: #4BA3ABFF;
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
</style>