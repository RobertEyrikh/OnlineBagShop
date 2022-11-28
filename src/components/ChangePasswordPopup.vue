<template>
  <div v-if="isOpen" class="backdrop" @click="close">
    <div class="popup">
      <div class="popupContent" @click.stop>
        <p class="inputTitle">Enter old password</p>
        <input class="input__field">
        <p class="inputTitle">Enter new password</p>
        <input class="input__field" v-model="newPassword">
        <p class="inputTitle" >Repeat password</p>
        <input class="input__field">
        <button class="close-button" id="button" @click="close"> Close</button>
        <button class="change-button" id="button" @click="changePassword">Change password</button>
      </div>
    </div>
  </div>
</template>

<script>

import useVuelidate from '@vuelidate/core'

export default {
  name: 'changePassword',
  data() {
    return {
      v$: useVuelidate(),
      email: '',
      password: '',
      newPassword: '',
    }
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
      this.$store.dispatch('CHANGE_PASSWORD', this.newPassword)
    },
    close() {
      this.$emit('close');
    },
  }
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
  max-width: 500px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #2f6a6f, -5px -5px 10px rgb(66, 146, 154);
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

.input {
  grid-column: 1/3;
  height: 27px;
  border-radius: 5px;
  border-style: none;
  box-shadow: 5px 5px 10px #2f6a6f, -5px -5px 10px rgb(66, 146, 154);
}

#button {
  cursor: pointer;
  border-radius: 5px;
  border-style: none;
  height: 25px;
  transition: background-color .2s ease-in-out;
  box-shadow: 3px 3px 7px #2f6a6f, -3px -3px 7px rgb(66, 146, 154);
}

#button:hover {
  background-color: #2f6a6f;
}

.close-button {
  grid-column: 1/2;
  width: 80px;
  height: 40px !important;
}

.change-button {
  grid-column: 2/3;
  width: 80px;
  height: 40px !important;
}
</style>