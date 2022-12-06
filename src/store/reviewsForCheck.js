import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";

export default {
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    GET_REVIEWS_FOR_CHECK({ commit }) {
      const db = getDatabase();
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        if (user.uid == "SyQvjsJTdjfabSrwlLJX0rlFv5A3") {
          const reviewsRef = ref(db, 'PendingReviews/');
          onValue(reviewsRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data)
            for (let itemId in data) {
              if (data.hasOwnProperty(itemId)) {
                //console.log(data[itemId])

                // for (let userId in data[itemId]) {
                //   if (data[itemId].hasOwnProperty(userId)) {
                //     console.log(data[itemId[userId]])

                //   }                  
                // }

                //console.log(`${key} : ${data[key]}`)
              }
            }
          })
        }
      })
    }, 
  }
}