import axios from 'axios';
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, update, onValue } from "firebase/database";

export default {

  state: {
    name: null,
    phone: null,
    birthday: null,
    user: null,
  },

  mutations: {
    SET_NAME (state, payload) {
      state.name = payload
    }

  },

  actions: {
    async PUSH_NAME({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      update(ref(db, 'Users/' + user.uid), {
        name: payload,
      });
      commit ('SET_NAME', this.name)
    },
    async CHANGE_PASSWORD() {

    },
    async PUSH_PHONE() {

    },
    async PUSH_BIRTHDAY() {

    },
    async GET_USER_INFO({ state }) {
      console.log(state.user)
      const db = getDatabase();
      let user = setTimeout(getAuth().currentUser, 1000);
     // let user = getAuth().currentUser
      const userRef = ref(db, 'Users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        console.log(user)
      });
      setTimeout(console.log(getAuth().currentUser), 2000)
    }, 
  }
}