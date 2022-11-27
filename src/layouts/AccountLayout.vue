<template>
  <body>
    <AppLayoutProductCategory>
      <main>
        <div>
          <div class="navbar">
            <div class="navbtn" @click="this.$router.push('/account')"><img src="../assets/user/main.svg"/>Main</div>
            <div class="navbtn" @click="this.$router.push('/wishlist')"><img src="../assets/user/wishlist.svg" />Wishlist</div>
            <div class="navbtn" @click="this.$router.push('/purchases')"><img src="../assets/user/purchases.svg" />Purchases</div>
            <div class="dropdown">    
              <button class="dropbtn">
              <img class="feedback" src="../assets/user/feedback.svg" />
                Feedback
                <i class="fa fa-caret-down"></i>
              </button>
            <div class="dropdown-content">
              <a @click="this.$router.push('/reviews')">Reviews</a>
              <a @click="this.$router.push('/questions')">Questions</a>
            </div>
          </div>
          <div class="navbtn" @click="this.$router.push('/profile')"><img src="../assets/user/profile.svg" />Profile</div>
          </div>
        </div>
      </main>
      <slot/>
    </AppLayoutProductCategory>
  </body>
</template>

<script>
import AppLayoutProductCategory from "@/layouts/AppLayoutProductCategory";
export default {
    name: 'AccountLayoutCategory',
    components: { AppLayoutProductCategory },

    data() {
        return {}
    }
}
</script>

<style scoped>
html,body {
  font-family: 'Open Sans', sans-serif;
  background-color: #9ee0e6;
  box-shadow: 5px 5px 10px #82bbbf , -5px -5px 10px #b4ebf0;
  border-radius: 10px;
}

body {
  padding: 12px;
}

main {
  margin-right: 40px;
  margin-top: 25px;
}

.navbar {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-left: 40px;
    padding-right: 40px;
}

.navbtn {
    display: flex;
}
.navbtn img {
    padding-right: 10px;
    max-height: 20px;
    max-height: 20px
}

.navbar a, .navbtn {
    cursor: pointer;
    float: left;
    font-size: 16px;
    color: #000;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

.dropdown {
    float: left;
    overflow: hidden;
}

.feedback {
    padding-right: 10px;
    max-height: 20px;
    max-height: 20px;
    float: left
}

.dropdown .dropbtn {
    font-size: 16px;
    border: none;
    outline: none;
    color: #000;
    padding: 14px 16px;
    background-color: inherit;
    font-family: inherit;
    margin-right: 4px;
}

.dropbtn {
    display: flex
}

.navbtn:hover,
.dropbtn:hover,
.dropdown:hover .feedback {
    filter: invert(56%) sepia(63%) saturate(351%) hue-rotate(137deg) brightness(91%) contrast(84%);
}

.navbar a:hover,
.dropdown:hover .dropbtn {
    color: #4ba3ab;
}

.dropdown-content {
    border-radius: 5px;
    display: none;
    position: absolute;
    background-color: #9ee0e6;
    min-width: 110px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    border-radius: 5px;
    float: none;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {
    color: black;
    background-color: #4BA3ABFF;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>