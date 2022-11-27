<template>
  <account-layout-category>
    <div class="profile-body">
      <div class="profile-card">
        Name:
        <div class="profile__info">
          {{name}}
        </div>
      </div>
      <div class="profile-card">
        Email:
        <div class="profile__info">
        {{email}}
        </div>
      </div>
      <div class="profile-card">
        Birthday:
        <div class="profile__info">
          {{birthday}}
        </div>
      </div>
    </div>
  </account-layout-category>
</template>

<script>
import { mapState } from 'vuex';
import AccountLayoutCategory from "@/layouts/AccountLayout"
export default {
  name: "AccountProfile",
  components: { AccountLayoutCategory },

  data() {
    return {
      name: '',
      birthday: '',
      email: '22',
    }
  },

  computed: {
    ...mapState({
      birthday: state => state.userInfo.birthday,
      email: state => state.userInfo.email,
      name: state => state.userInfo.name,
    })
  },

  mounted() {
    this.$store.dispatch("GET_USER_INFO")
  }

}
</script>

<style>
.profile-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  margin: 10px 40px 10px 40px;
  background-color: #4ba3ab;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.profile-card {
  padding: 5%;
  display: flex
}

.profile__info {
  
}
</style>