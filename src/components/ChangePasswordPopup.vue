<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup">
      <div class="popupContent" @click.stop>
        <p class="inputTitle">Enter old password</p>
        <input 
          class="input__field" 
          type="password"
          v-model.lazy.trim="oldPassword"
          >       
        <p class="inputTitle">Enter new password</p>
        <input 
          class="input__field"
          type="password"
          v-model.lazy.trim="newPassword"
          :class="{ invalid: (v$.newPassword.$invalid && !v$.newPassword.required.$invalid)}"
          >
        <p class="inputTitle">Repeat password</p>
        <input
          class="input__field"
          type="password"
          v-model.trim="confirmPassword"
          :class="{ invalid: (newPassword != confirmPassword)}"
          >
        <transition-group name="list-complete" class="list-complete" tag="p">
          <p class="successMessage list-complete-item" v-if="passwordSucces">password has been successfully changed</p>
          <p class="errorMessage list-complete-item" v-if="passwordError">incorrect current password</p>
          <p class="errorMessage list-complete-item" v-if="passwordLength">password must contain at least 6 characters</p>
        </transition-group>
        <button class="close-button" id="button" @click="close"> Close</button>
        <button class="change-button" id="button" @click="changePassword">Change password</button>
      </div>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, sameAs } from '@vuelidate/validators'
import { TransitionGroup } from 'vue'
import { mapState } from 'vuex';

export default {
  components: { TransitionGroup },
  name: "changePassword",
  data() {
    return {
      v$: useVuelidate(),
      email: "",
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
      passwordSucces: false,
      passwordError: false,
      passwordLength: false,
    };
  },
  props: {
    isOpen: {
      required: true,
      type: Boolean,
    },
  },
  emits: {
    close: null,
    logIn: null,
  },
  methods: {
    changePassword() {
      let payload = { key1: this.oldPassword, key2: this.newPassword };
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$store.dispatch("CHANGE_PASSWORD", payload);
         {
          if (!this.authError) {
            this.passwordSucces = true;
            this.passwordError = false;
            this.passwordLength = false;
            this.confirmPassword = "";
            this.newPassword = "";
            this.oldPassword = "";
          }
          else {
            this.passwordError = true;
            this.passwordLength = false;
          }
        }
      }
      else {
        this.passwordLength = true;
        this.passwordError = false;
      }
      this.confirmPassword = "";
      this.newPassword = "";
      this.oldPassword = "";
    },

    close() {
      this.passwordSucces = false,
      this.passwordError = false,
      this.passwordLength = false,
      this.$emit("close");
      this.confirmPassword = "";
      this.newPassword = "";
      this.oldPassword = "";
    },
  },

  validations() {
    return {
      oldPassword: { minLength: minLength(6), required, $lazy: true },
      newPassword: { minLength: minLength(6), required, $lazy: true },
      confirmPassword: { sameAs: sameAs(this.newPassword), $lazy: true },
    };
  },
  computed: {
    ...mapState({
      authError: state => state.userInfo.authError,
    })
  }, 
}

</script>

<style scoped>
.backdrop {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgb(0, 0, 0, 0.3);
  top: 0;
  left: 0;
}

.popup {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 10px;
}

.popupContent {
  background-color: #4ba3ab;
  color: #000;
  width: 200px;
  max-width: 500px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
}

.inputTitle {
  grid-column: 1/3;
  text-align: center;
  font-size: 18px;
  margin: 10px
}

.input__field {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

#button {
  cursor: pointer;
  border-radius: 5px;
  border-style: none;
  height: 25px;
  transition: background-color .2s ease-in-out;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
}

#button:hover {
  background-color: #2f6a6f;
}

.successMessage,
.errorMessage {
  color: #111;
  border-radius: 5px;
  max-width: 200px;
  padding: 20px 0 20px 0;
  grid-column: 1/3;
  text-align: center;
  font-size: 12px;
}

.successMessage {
  background-color: #1d903c;
  opacity: 0.9;
}

.errorMessage {
  background-color: #ac3b48;
  opacity: 0.9;
}

.close-button {
  grid-column: 1/2;
  width: 80px;
  height: 40px !important;
}

.change-button {
  grid-column: 2/3;
  width: 100%;
  height: 40px !important;
}

.list-complete {
  grid-column: 1/3 ;
}
.list-complete-item { 
  transition: all 0.8s ease;
  display: inline-block;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>