import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";

export default {
  state: {
    arrayOfComments: []
  },
  mutations: {
    SET_ARRAY_OF_COMMENTS(state, payload) {
      state.arrayOfComments = payload
    }
    
  },
  actions: {
    GET_REVIEWS_FOR_CHECK({ commit }) {
      let arrayOfComments = []
      const db = getDatabase();
      const auth = getAuth()
      const dbRef = ref(getDatabase())
      onAuthStateChanged(auth, async user => {
        if (user.uid == "SyQvjsJTdjfabSrwlLJX0rlFv5A3") {
          const reviewsRef = ref(db, 'PendingReviews/');
          onValue(reviewsRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(data) - id товара
            for (let itemId in data) {
              if (data.hasOwnProperty(itemId)) {
                //console.log(data[itemId]) - id пользователя
                for (let userId in data[itemId]) {
                  if (data[itemId].hasOwnProperty(userId)) {
                    //console.log(data[itemId][userId]) - инфа
                    //console.log(user)
                    let commentInfo = {
                      'itemId': itemId,
                      'userId': userId,
                      'rate': data[itemId][userId].rate,
                      'review': data[itemId][userId].review,
                    }
                    arrayOfComments.push(commentInfo)
                  }                  
                }               
              }
            }
            commit('SET_ARRAY_OF_COMMENTS', arrayOfComments)
          })
        }
      })
    }, 
    DELETE_REVIEW({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      let itemId = payload.itemId
      let userId = payload.userId
      const dbRef = ref(getDatabase())
      remove(ref(db, 'PendingReviews/' + itemId + `/${userId}`), {
        
      }); 
    },
    PUBLISH_REVIEW({ commit }, payload) {

    }
  }
}