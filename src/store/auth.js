import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser } from "firebase/auth";  

export default {
    state: () => ({ 
        user: null
    }),
    mutations: {
        SET_USER (state) {
            state.user = updateCurrentUser
        },
        CLEAR_USER (state) {
            state.user = null
        }
    },
    actions: {
        async login({ dispatch, commit }, { email, password }) {
            try {
                await signInWithEmailAndPassword(getAuth(), email, password)

                commit('SET_USER')
            } catch (e) {
                throw e
            } 
        },
        async register({ dispatch, commit }, {email, password}) {

        },
        async logout ({ dispatch, commit }) {
            await signOut(getAuth())

            commit('CLEAR_USER')
        },

        fetchUser ({ commit }) {
            const auth = getAuth();
            onAuthStateChanged(auth, async user => {
                if (user === null) {
                    commit('CLEAR_USER')
                    console.log('userNotFound')
                } else {
                    commit('SET_USER')
                    console.log('userFound')
                }
                //console.log(user)
            })
        },  
    }
}
