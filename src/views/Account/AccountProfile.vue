<template>
  <account-layout-category>
    <div class="profile-body">
      <div class="profile-card">
        Name:
        <div class="profile__info">
          <div v-if="!isEditName">
            <div>&nbsp {{ this.name }}</div>
            <button @click="isEditName=!isEditName" class="edit"><img src="@/assets/icons/editProfile.svg" ></button>            
          </div>
          <div v-if="isEditName">
            <input class="input__field"  v-model="newName">
            <button  @click="isEditName = !isEditName, changeName()" class="edit"><img src="@/assets/icons/check.svg"></button> 
            <button @click="isEditName=!isEditName" class="edit"><img src="@/assets/icons/cancel.svg"></button>
          </div>
        </div>
      </div>
      <div class="profile-card">
        Email:
        <div class="profile__info"> 
          <div>
            <div>&nbsp {{ this.email }}</div>
          </div>      
        </div>
      </div>
      <div class="profile-card">
        Birthday:
        <div class="profile__info">   
          <div v-if="!isEditBirthday">
            <div>&nbsp {{ this.birthday }}</div>
            <button @click="isEditBirthday = !isEditBirthday" class="edit"><img src="@/assets/icons/editProfile.svg"></button>
          </div>  
          <div v-if="isEditBirthday">
            <input class="input__field" v-model="newBirthday"  >
            <button @click="isEditBirthday = !isEditBirthday, changeBirthday()" class="edit"><img src="@/assets/icons/check.svg"></button>
            <button @click="isEditBirthday = !isEditBirthday" class="edit"><img src="@/assets/icons/cancel.svg"></button>
          </div>   
        </div>
      </div>
      <div class="profile-card">
        Phone:
        <div class="profile__info">
          <div v-if="!isEditPhone">
            <div>&nbsp {{ this.phone }}</div>
            <button @click="isEditPhone = !isEditPhone" class="edit"><img src="@/assets/icons/editProfile.svg"></button>
          </div>
          <div v-if="isEditPhone">
            <input class="input__field" v-model="newPhone">
            <button @click="isEditPhone = !isEditPhone, changePhone()" class="edit"><img src="@/assets/icons/check.svg"></button>
            <button @click="isEditPhone = !isEditPhone" class="edit"><img src="@/assets/icons/cancel.svg"></button>
          </div>
        </div>
      </div>
      <div class="profile-card">
        <my-button class="my-button" @click="isPopupOpen=true">Change password</my-button>
        <change-password-popup :is-open="isPopupOpen" @close="isPopupOpen = false" />
      </div>
    </div>
  </account-layout-category>
</template>

<script>
import ChangePasswordPopup from '@/components/ChangePasswordPopup.vue';
import { mapState } from 'vuex';
import MyButton from '@/components/UI/MyButton.vue';
import AccountLayoutCategory from "@/layouts/AccountLayout"
export default {
  name: "AccountProfile",
  components: { AccountLayoutCategory, MyButton, ChangePasswordPopup },

  data() {
    return {
      newPhone: '',
      newName: '',
      newBirthday: '',
      isEditName: false,
      isEditBirthday: false,
      isEditPhone: false,
      isPopupOpen: false,
    }
  },

  methods: {
    changeName() {
      this.$store.dispatch("CHANGE_NAME", this.newName)
    },
    changePhone() {
      this.$store.dispatch("CHANGE_PHONE", this.newPhone)
    },
    changeBirthday() {
      this.$store.dispatch("CHANGE_BIRTHDAY", this.newBirthday)
    }
  },

  computed: {
    ...mapState ({
      birthday: state => state.userInfo.birthday,
      email: state => state.userInfo.email,
      name: state => state.userInfo.name,
      phone: state => state.userInfo.phone,
    }),
  },

  watch: {
    newPhone(newValue) {
      return newValue
    }
  },

  mounted() {
    return this.$store.dispatch("GET_USER_INFO")
  }

}
</script>

<style scoped>
.profile-body {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  margin: 10px 40px 10px 40px;
  background-color: #4ba3ab;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.profile-card {
  padding: 20px 5% 20px 5%;
  display: flex;
  align-items: center;
}

.profile__info > div,
.profile__info {
  display: flex;
  align-items: center;
}

.profile__info {
  height: 30px
}


.edit {
  max-height: 25px;
  max-width: 35px;
  padding: 0;
  border: none;
  font: inherit;
  color: inherit;
  background-color: transparent;
  cursor: pointer;
  transition: all .2s;
  margin-left: 10px;
  margin-right: 10px;
}

.input__field {
  width: 120px;
  height: 30px;
  border-radius: 5px;
  border-style: none;
  outline: none;
  transition: all .2s;
  border: 2px solid #4ba3ab
}

.input__field:hover {
  border: 2px solid black
}

.edit > img {
  height: 20px;
  width: 20px;
}

.edit:hover {
  filter: invert(10%) sepia(64%) saturate(5365%) hue-rotate(243deg) brightness(94%) contrast(113%);
}

.my-button {
  background-color: #4ba3ab;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>