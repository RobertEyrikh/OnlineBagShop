<template>
  <admin-devtools-layout>
    <div class="admin-users__body">
      <div class="list-title">
        <p class="cell cell__uid ">
          user ID
        </p>
        <p class="cell cell__email">
          email
        </p>
        <p class="cell cell__name">
          name
        </p>
        <p class="cell cell__phone">
          phone
        </p>
        <p class="cell cell__birthday">
          birthday
        </p>
        <p class="cell cell__adress">
          adress
        </p>
      </div>
      <ul class="user-list">
        <div class="loader" v-if="!users"></div>
        <li v-for="user in users" class="this-user">
          <p class="cell">
            {{user.uid}}
          </p>
          <p class="cell">
            {{user.email}}
          </p>
          <p class="cell">
            {{user.name}}
          </p>
          <p class="cell">
            {{user.phone}}
          </p>
          <p class="cell">
            {{user.birthday}}
          </p>
          <p class="cell">
            {{user.adress}}
          </p>
        </li>
      </ul>
      {{ setAllUsers }}
    </div>
    <button @click="check">2132131231</button>
  </admin-devtools-layout>
</template>

<script>
import AdminDevtoolsLayout from '@/layouts/AdminDevtoolsLayout.vue';
import { mapState } from 'vuex';

export default {
  name: 'AdminUsersList',
  components: { AdminDevtoolsLayout },
  data() {
    return {
      allUsers: [],
    }
  },
  methods: {
    check() {
      console.log(this.users)
    }
  },
  computed: {
    ...mapState({
      users: state => state.userInfo.users
    }),
    setAllUsers(){
      console.log(this.users)
      for(let key in this.users) {
        console.log(key)
      }
    }
  },
  mounted() {
    this.$store.dispatch('GET_ALL_USERS')
  },
}
</script>

<style scoped>
.admin-users__body {
  margin: 10px;
  background-color: #F0EBF4;
  height: 720px;
  overflow: auto;
}

.list-title {
  /* background-color: #B39BC8; */
  list-style-type: none;
  display: grid;
  grid-template-columns: 300px 300px 150px 150px 150px 300px;
  font-weight: bold;
  font-size: 20px;
}

.user-list {
  margin-left: 0;
  padding-left: 0;
  /* height: 700px; */
  /* overflow: scroll; */
  margin: 0;
}

.cell__adress,
.cell__email,
.cell__name, 
.cell__phone,
.cell__birthday,
.cell__uid {
  background-color: #B39BC8;
}
.cell {
  border: 1px solid #111;
  margin: 0px;
  padding: 3px;
  font-size: 15px;
}

.this-user {
  list-style-type: none;
  display: grid;
  grid-template-columns: 300px 300px 150px 150px 150px 300px;
  height: 30px;
}
</style>