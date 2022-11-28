import { User } from '@/components/Users';
import axios from 'axios';
import { getAuth, onAuthStateChanged, updatePassword } from "firebase/auth";
import { getDatabase, ref, set, update, onValue,  } from "firebase/database";

export default {
  state: {
    name: null,
    phone: null,
    email: null,
    birthday: null,
  },

  mutations: {
    SET_NAME (state, payload) {
      state.name = payload
    },
    SET_EMAIL (state, payload) {
      state.email = payload
    },
    SET_PHONE(state, payload) {
      state.phone = payload
    },
    SET_BIRTHDAY(state, payload) {
      state.birthday = payload
    },
  },

  actions: {
    async CHANGE_PASSWORD(payload) {
      const auth = getAuth();
      const user = auth.currentUser;
      const newPassword = payload
      updatePassword(user, newPassword).then(() => {
        console.log('password has been changed')
      }).catch((error) => {
        console.log(error)
      });
    },

    async CHANGE_NAME({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      update(ref(db, 'Users/' + user.uid), {
        name: payload,
      });
      commit ('SET_NAME', this.name)
    },

    async CHANGE_PHONE({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      update(ref(db, 'Users/' + user.uid), {
        phone: payload,
      });
      commit('SET_PHONE', this.phone)
    },

    async CHANGE_BIRTHDAY({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      update(ref(db, 'Users/' + user.uid), {
        birthday: payload,
      });
      commit('SET_BIRTHDAY', this.birthday)
    },

    GET_USER_INFO({ commit }) {
      const db = getDatabase();
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        if (user) {
          const userRef = ref(db, 'Users/' + user.uid);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            let authUser = new User({
              email: data.email,
              name: data.name,
              phone: data.phone,
              birthday: data.birthday
          });  
            commit('SET_NAME', authUser.name)
            commit('SET_EMAIL', authUser.email)
            commit('SET_PHONE', authUser.phone)
            commit('SET_BIRTHDAY', authUser.birthday)      
          })                 
        }
      })
    }, 
  }
}