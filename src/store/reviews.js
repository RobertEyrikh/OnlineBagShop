import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";

export default {
  state: {
    isExistComment: [],
    isSuccessComment: [],
  },
  mutations: {
    EXIST_COMMENT_PUSH(state, payload) {
      state.isExistComment = [payload]
    },
    SUCCESSFUL_COMMENTED(state, payload) {
      state.isSuccessComment = [payload]
    }   
  },
  actions: {
    async SEND_FEEDBACK_FOR_CHECK({ commit }, payload) {
      const db = getDatabase()
      const dbRef = ref(getDatabase())
      let user = getAuth().currentUser
      console.log(payload.itemId)
      get(child(dbRef, 'PendingReviews/' + payload.itemId)).then((snapshot) => {
        const data = snapshot.val();
        if (data == null) {
          update(ref(db, 'PendingReviews/' + payload.itemId + `/${user.uid}`), {
            rate: payload.rate,
            review: payload.review
          })
          commit('SUCCESSFUL_COMMENTED', payload.itemId)
          commit('EXIST_COMMENT_PUSH', 0)
          
        } else if (data[user.uid] !== undefined) {
          commit('EXIST_COMMENT_PUSH', payload.itemId)
          commit('SUCCESSFUL_COMMENTED', 0)
        } else {
          update(ref(db, 'PendingReviews/' + payload.itemId + `/${user.uid}`), {
            rate: payload.rate,
            review: payload.review
          })
          commit('SUCCESSFUL_COMMENTED', payload.itemId)
          commit('EXIST_COMMENT_PUSH', 0)
        }

        // console.log(data[user.uid])

        // if (data[user.uid] !== null) {
        //   console.log('comment has been added')
        // } else   {
        //   update(ref(db, 'PendingReviews/' + payload.itemId + `/${user.uid}`), {
        //     rate: payload.rate,
        //     review: payload.review
        //   });
        // } 

      })
    },
  }
}