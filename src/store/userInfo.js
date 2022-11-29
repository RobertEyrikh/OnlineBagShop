import { User } from '@/components/Users';
import { getAuth, onAuthStateChanged, updatePassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, update, onValue, } from "firebase/database";

export default {
  state: {
    name: null,
    phone: null,
    email: null,
    birthday: null,
    authError: null,
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
    SET_AUTH_ERROR(state, payload) {
      state.authError = payload
    }
  },

  actions: {
    async CHANGE_PASSWORD({ commit, state }, payload) {
      const auth = getAuth();
      const user = auth.currentUser;
      console.log(payload)
      signInWithEmailAndPassword(auth, user.email, payload.key1)
      .then(() => {
        updatePassword(user, payload.key2).then(() => {
          console.log('password has been changed')
          commit('SET_AUTH_ERROR', false)
          console.log(state.authError)
        }).catch((error) => {
          commit('SET_AUTH_ERROR', true)
          console.log(error)
        });       
      }) 
      console.log(state.authError)
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