<template>
  <AppLayoutProductCategory>
    <main>
      <div>
        <div class="navbar">
          <div class="navbtn" @click="this.$router.push('/account')"><img src="../assets/user/main.svg" />Main</div>
          <div class="navbtn" @click="this.$router.push('/wishlist')"><img src="../assets/user/wishlist.svg" />Wishlist
          </div>
          <div class="navbtn" @click="this.$router.push('/purchases')"><img src="../assets/user/purchases.svg" />Purchases
          </div>
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
    <slot> 

    </slot>
  </AppLayoutProductCategory>
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
main {
  margin: 0;
}

.navbar {
    overflow: hidden;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    margin: 20px 4% 0px 4%;
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
    filter: invert(62%) sepia(60%) saturate(1682%) hue-rotate(298deg) brightness(100%) contrast(89%);
}

.navbar a:hover,
.dropdown:hover .dropbtn {
    color: #F172A1;
}

.dropdown-content {
    border-radius: 10px;
    display: none;
    position: absolute;
    background-color: #F172A1;
    min-width: 110px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}

.dropdown-content a {
    border-radius: 10px;
    float: none;
    color: #F0EBF4;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {
    color: #F0EBF4;
    background-color: #E64398;
}

.dropdown:hover .dropdown-content {
    display: block;
}
</style>