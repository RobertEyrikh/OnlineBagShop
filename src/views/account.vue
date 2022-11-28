<template>
    <account-layout-category>
      <div class="account-body">
        <div class="account-info-card">
          <div @click="this.$router.push('/profile')" class="account__profile" >
            <div>name: {{this.name}}</div>
            <div>email: {{this.email}}</div>
            <div>phone: {{this.phone}}</div>
            <div>birthday: {{this.birthday}}</div>
          </div>
          <div @click="this.$router.push('/wishlist')" class="account__wishlist">
            <h1>Wishlist:</h1>
          </div>
          <div @click="this.$router.push('/purchases')" class="account__purchase">
            <h1>Purchases:</h1>
          </div>
        </div>
      </div>
    </account-layout-category>
</template>

<script>
import { mapState } from 'vuex';
import AccountLayoutCategory from "@/layouts/AccountLayout"

export default {
  name: "account",
  components: { AccountLayoutCategory },

  data() {
    return {

    }
  },

  computed: {
    ...mapState({
      birthday: state => state.userInfo.birthday,
      email: state => state.userInfo.email,
      name: state => state.userInfo.name,
      phone: state => state.userInfo.phone,
    }),
  },

  mounted() {
    return this.$store.dispatch("GET_USER_INFO")
  }

  }
</script>

<style scoped>
.account-body {
  margin: 5%
}
.account-info-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.account-info-card > div {
  background-color: #4ba3ab;
  padding: 5%;
  border-radius: 5px;
  cursor: pointer;
  transition: all .3s ease-in-out;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

.account-info-card > div:hover {
  box-shadow: 3px 3px 3px 1.5px rgba(0, 0, 0, 0.2);
  scale: 1.01
}

.account__profile > div {
  padding: 5px;
}
</style>