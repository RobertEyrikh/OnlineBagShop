import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser } from "firebase/auth";  
import { getDatabase } from "firebase/database";

export default {
    state: () => ({ 
        user: null
    }),
    mutations: {
        SET_USER (state) {
            state.user = getAuth().currentUser
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
        async register({ dispatch, commit }, {email, password, }) {
            try {
                await createUserWithEmailAndPassword(getAuth(), email, password)
                // const uid = await dispatch('getUid')
                // await set (ref(getDatabase(), `/users/${uid}/info`)), {
                //     name
                // }
                commit('SET_USER')
            } catch(e) {
                console.log(e)
                throw e
            }
        },
        getUid() {
            const user = getAuth().currentUser
            return user ? user.uid : null
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
