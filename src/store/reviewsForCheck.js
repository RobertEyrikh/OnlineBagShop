import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";

export default {
  state: {
    arrayOfComments: [],
    arrayOfAllComments: [],
  },
  mutations: {
    SET_ARRAY_OF_COMMENTS(state, payload) {
      state.arrayOfComments = payload
    },
    SET_ARRAY_OF_ALL_COMMENTS(state, payload) {
      state.arrayOfAllComments = payload
    },    
  },
  actions: {
    GET_ALL_REVIEWS({ commit }) {
      let arrayOfAllComments = []
      const db = getDatabase();
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        if (user.uid == "SyQvjsJTdjfabSrwlLJX0rlFv5A3") {
          const reviewsRef = ref(db, 'Reviews/');
          onValue(reviewsRef, (snapshot) => {
            const data = snapshot.val();
            for (let itemId in data) {
              if (data.hasOwnProperty(itemId)) {
                for (let userId in data[itemId]) {
                  if (data[itemId].hasOwnProperty(userId)) {
                    let commentInfo = {
                      'itemId': itemId,
                      'userId': userId,
                      'rate': data[itemId][userId].rate,
                      'review': data[itemId][userId].comment,
                    }
                    arrayOfAllComments.push(commentInfo)
                  }
                }
              }
            }
            commit('SET_ARRAY_OF_ALL_COMMENTS', arrayOfAllComments)
            // console.log(arrayOfAllComments)
          })
        }
      })
    },
    GET_REVIEWS_FOR_CHECK({ commit }) {
      let arrayOfComments = []
      const db = getDatabase();
      const auth = getAuth()
      //const dbRef = ref(getDatabase())
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
      let itemId = payload.itemId
      let userId = payload.userId
      remove(ref(db, 'PendingReviews/' + itemId + `/${userId}`), {       
      }); 
    },

    PUBLISH_REVIEW({ commit, state }, payload) {
      const db = getDatabase()
      console.log(payload.itemId)
      update(ref(db, 'Reviews/' + payload.itemId + `/${payload.userId}`), {
        rate: payload.rate,
        comment: payload.comment,
        user: payload.userId,
      })
      remove(ref(db, 'PendingReviews/' + payload.itemId + `/${payload.userId}`), {
      });
      let updatedArrayOfComments = state.arrayOfComments.filter((element) => element.itemId !== payload.itemId)
      commit('SET_ARRAY_OF_COMMENTS', updatedArrayOfComments)
    },

    DELETE_PUBLISHED_REVIEW({ commit }, payload) {
      const db = getDatabase()
      let itemId = payload.itemId
      let userId = payload.userId
      remove(ref(db, 'Reviews/' + itemId + `/${userId}`), {
      }); 
    },
    
    UPDATE_PUBLISHED_REVIEW({ commit }, payload) {

    }
  }
}