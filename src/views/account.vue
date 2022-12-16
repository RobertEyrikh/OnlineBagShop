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
            <div class="wishlist-brief">
              <div v-for='item in wishlist' :key="componentKey">
                <img :src="`${item.image}`" class="wishlist-image" alt="bag">
              </div>
            </div>
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
      componentKey: 0
    }
  },
  methods: {
    updateImage() {
      this.componentKey += 1
    },
  },

  computed: {
    ...mapState({
      birthday: state => state.userInfo.birthday,
      email: state => state.userInfo.email,
      name: state => state.userInfo.name,
      phone: state => state.userInfo.phone,
      wishlist: state => [...state.wishlist.wishlist],
    }),
  },
  watch: {
    wishlist: {
      handler(val, oldVal) {
        setTimeout(this.updateImage, 10000)
      },
      deep: true
    }
  },

  mounted() {
    this.$store.dispatch("GET_USER_INFO")
    this.$store.dispatch("GET_ITEM_FROM_WISHLIST")
  }

  }
</script>

<style scoped>
.account-body {
  margin: 10px 5% 40px 5%
}
.account-info-card {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.account-info-card > div {
  background-color: #A1C3D1;
  padding: 5%;
  border-radius: 10px;
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

.wishlist-brief {
  display: flex;
  overflow: hidden;
  height: 55px;
}

.wishlist-image {
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50px;
  margin-right: -20px;
  border: 1px solid ;
}
</style>