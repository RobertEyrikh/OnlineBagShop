import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";
import Review from "@/components/Review"

export default {
  state: {
    isExistComment: [],
    isSuccessComment: [],
    arrayOfComments: [],
    commentsOfUser: [],
    pendingCommentsOfUser: [],
  },
  mutations: {
    EXIST_COMMENT_PUSH(state, payload) {
      state.isExistComment = [payload]
    },
    SUCCESSFUL_COMMENTED(state, payload) {
      state.isSuccessComment = [payload]
    },
    SET_ARRAY_OF_COMMENTS(state, payload) {
      state.arrayOfComments = payload
    },
    SET_COMMENTS_OF_USER(state, payload) {
      state.commentsOfUser = payload
    },
    SET_PENDING_COMMENTS_OF_USER(state, payload) {
      state.pendingCommentsOfUser = payload
    },
  },
  actions: {
    GET_REVIEWS_OF_USER({ commit }, payload) {
      let arrayOfPendingComments = []
      let arrayOfComments = []
      const db = getDatabase();
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        const pendingReviewsRef = ref(db, 'PendingReviews/');
        onValue(pendingReviewsRef, (snapshot) => {
          const data = snapshot.val();
          for (let itemId in data) {
            if (data.hasOwnProperty(itemId)) {
              let commentInfo =  {
                itemId: itemId,
                userId: user.uid,
                rate: data[itemId][user.uid].rate,
                review: data[itemId][user.uid].review,
              }
              arrayOfPendingComments.push(commentInfo)
            }           
          }
          commit('SET_PENDING_COMMENTS_OF_USER', arrayOfPendingComments)
        })
        const reviewsRef = ref(db, 'Reviews/');
        onValue(reviewsRef, (snapshot) => {
          const data = snapshot.val();
          for (let itemId in data) {
            if (data.hasOwnProperty(itemId)) {
              let commentInfo = {
                itemId: itemId,
                userId: user.uid,
                rate: data[itemId][user.uid].rate,
                review: data[itemId][user.uid].comment,
              }
              arrayOfComments.push(commentInfo)
            }
          }
          commit('SET_COMMENTS_OF_USER', arrayOfComments)
        })
      })
    },

    async SEND_FEEDBACK_FOR_CHECK({ commit }, payload) {
      const db = getDatabase()
      const dbRef = ref(getDatabase())
      let user = getAuth().currentUser
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
      })
    },
    GET_REVIEWS_OF_ITEM({ commit }, payload) {
      let arrayOfComments = []
      const db = getDatabase();
      const dbRef = ref(getDatabase())
      const reviewsRef = ref(db, 'Reviews/');
      onValue(reviewsRef, (snapshot) => {
        const data = snapshot.val();        
        if(data.hasOwnProperty(payload)) {
          let itemComments = data[payload]
          for (let item in itemComments) {
            // console.log(itemComments[item])
            // let commentBody = itemComments[item]
            let commentInfo = {
              itemId: payload,
              userId: item,
              rate: itemComments[item].rate,
              comment: itemComments[item].comment,
            }
            arrayOfComments.push(commentInfo)
            //console.log(commentInfo)
          }
        }
        commit('SET_ARRAY_OF_COMMENTS', arrayOfComments)
        //console.log(arrayOfComments)
      })
    }
  }
}