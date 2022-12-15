import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue, get, child } from "firebase/database";
import { getStorage, ref as storageReference, getDownloadURL } from "firebase/storage";

export default {
  state: {
    wishlist: [],
    wishlistItemsId: [],
  },

  mutations: {
    SET_WISHLIST(state, payload) {
      state.wishlist = payload
    },
    SET_WISHLIST_STATE(state, payload) {
      state.wishlistItemsId = payload
    }

  },
  actions: {
    async ADD_ITEM_TO_WISHLIST({ commit }, payload) {
      const db = getDatabase()
      const dbRef = ref(getDatabase())
      let user = getAuth().currentUser
      get(child(dbRef, 'Users/' + user.uid)).then((snapshot) => {
        const data = snapshot.val();
        if (data.wishlist == null) {
          update(ref(db, 'Users/' + user.uid), {
            wishlist: [payload]
          });
        } else {
          if(data.wishlist.includes(payload)) {
            let i = data.wishlist.indexOf(payload)
            data.wishlist.splice(i, 1)
            console.log(data.wishlist)
            update(ref(db, 'Users/' + user.uid), {
              wishlist: data.wishlist
            })
          } else {
            let newData = [...data.wishlist, payload]
            update(ref(db, 'Users/' + user.uid), {
              wishlist: newData
            });
          }
        }
      })
    },
    async GET_ITEM_FROM_WISHLIST({ commit }, payload) {
      const db = getDatabase();
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        if (user) {
          const itemRef = ref(db, 'TravelBags')
          const userRef = ref(db, 'Users/' + user.uid);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if(data) {
              if (data.wishlist) {
                commit('SET_WISHLIST_STATE', data.wishlist)
                onValue(itemRef, (snapshot) => {
                  let wishlistArray = []
                  const itemData = snapshot.val()
                  for (let key in itemData) {
                    if (data.wishlist) {
                      if (data.wishlist.includes(key)) {
                        getDownloadURL(storageReference(getStorage(), 'files/' + itemData[key].image))
                        .then((url) => {
                          wishlistItem.image = url
                          })
                        let wishlistItem = {
                          id: itemData[key].id,
                          image: 'add.svg',
                          price: itemData[key].price,
                          title: itemData[key].title,
                        }
                        wishlistArray.push(wishlistItem)
                      }
                    }
                  }
                  commit("SET_WISHLIST", wishlistArray)
                })
              }
            }
          })
        }
      })
    }
  },
}