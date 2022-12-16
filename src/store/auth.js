import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser } from "firebase/auth";  
import { getDatabase, ref, set, update, onValue } from "firebase/database";
import axios from 'axios'

export default {
    state: () => ({ 
        user: null,
        admin: false
    }),
    mutations: {
        SET_ADMIN (state) {
            state.admin = true
        },
        CLEAR_ADMIN (state) {
            state.admin = false
        },
        SET_USER (state) {
            state.user = getAuth().currentUser
        },
        CLEAR_USER (state) {
            state.user = null
        }
    },
    actions: {
        async login({ commit }, { email, password }) {
            try {
                await signInWithEmailAndPassword(getAuth(), email, password)
                commit('SET_USER')
                if (user.uid == 'SyQvjsJTdjfabSrwlLJX0rlFv5A3') {
                    commit('SET_ADMIN')
                } else {
                    commit('CLEAR_ADMIN')
                }
            } catch (e) {
                throw e
            } 

        },
        async register({ commit }, {email, password, }) {
            try {
                await createUserWithEmailAndPassword(getAuth(), email, password)
                commit('SET_USER')
                const url = "https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/Users"
                const user = getAuth().currentUser
                const newUser = {
                    email: user.email,
                    uid: user.uid
                }
                await axios.put(`${url}/${user.uid}.json`, newUser) 
            } catch(e) {
                console.log(e)
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
        },
        async logout ({ commit }) {
            await signOut(getAuth())
            commit('CLEAR_USER')
            commit('CLEAR_ADMIN')
        },

        fetchUser ({ commit }) {
            const auth = getAuth();
            onAuthStateChanged(auth, async user => {
                if (user === null) {
                    commit('CLEAR_USER')
                    commit('CLEAR_ADMIN')
                } else {
                    commit('SET_USER')
                    if (user.uid == 'SyQvjsJTdjfabSrwlLJX0rlFv5A3') {
                        commit('SET_ADMIN')
                    } else {
                        commit('CLEAR_ADMIN')
                    }
                }
            })
        }, 
        
    }
}
