import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";

export default {
  state: {
    
  },
  mutations: {

  },
  actions: {
    async SEND_FEEDBACK_FOR_CHECK({ commit }, payload) {
      const db = getDatabase()
      const dbRef = ref(getDatabase())
      let user = getAuth().currentUser
      console.log(payload.itemId)
      get(child(dbRef, 'PendingReviews/' + payload.itemId)).then((snapshot) => {
        const data = snapshot.val();
        console.log(data)
        if (data == null) {
          update(ref(db, 'PendingReviews/' + payload.itemId + `/${user.uid}`), {
            rate: payload.rate,
            review: payload.review
          });
        } 
        // else {
        //   let feedbackBody = {
        //     rate: payload.rate,
        //     review: payload.review
        //   }
        //   let newData = [data, {feedbackBody}]
        //   update(ref(db, 'PendingReviews/' + payload.itemId ), {
        //     newData
        //   });
        // }
      })
    },
  }
}