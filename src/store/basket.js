import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, onValue, get, child } from "firebase/database";

export default {
  state: {
    itemsCounter: '',
    basket: [],
    itemsQty: {},
    sameTypeItems: [],
  },
  mutations: {
    SET_BASKET(state, payload) {
      state.basket = payload
    },
    SET_ITEMS_QTY(state, payload) {
      state.itemsQty = payload
    },
    SET_SAME_TYPES_ITEMS(state, payload) {
      state.sameTypeItems = payload
    }
  },

  actions: {
    BUY_ITEMS({ commit, state }, payload) {
      console.log(state.itemsQty)

    },

    async GET_SAME_TYPE_ITEMS({ commit }, payload) {
      const db = getDatabase()
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        if (user) {
          const userRef = ref(db, 'Users/' + user.uid);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if (data.items) {
              let sameTypeItems = data.items.filter(function (item, pos) {
                return data.items.indexOf(item) == pos;
              })
              commit('SET_SAME_TYPES_ITEMS', sameTypeItems)
            }
          })
        }
      })
    },
    async GET_ITEMS_QTY({ commit }, payload) {
      const db = getDatabase()
      const auth = getAuth()
      let user = getAuth().currentUser
      onAuthStateChanged(auth, async user => {
        if (user) {
          const userRef = ref(db, 'Users/' + user.uid);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            if(data) {
              if (data.items) {
                let itemsQty = {}
                for (let elem of data.items) {
                  if (itemsQty[elem] === undefined) {
                    itemsQty[elem] = 1;
                  } else {
                    itemsQty[elem]++;
                  }
                }
                commit('SET_ITEMS_QTY', itemsQty)
              }
            }
          })
        }
      })
      
    },
    async REMOVE_SAME_TYPES_ITEMS({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      const dbRef = ref(getDatabase())
      get(child(dbRef, 'Users/' + user.uid)).then((snapshot) => {
        const data = snapshot.val();
        let newData = data.items.filter(function (f) { return f !== payload })
        update(ref(db, 'Users/' + user.uid), {
          items: newData
        });     
      })
    },
    async REMOVE_ONE_ITEM({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      const dbRef = ref(getDatabase())
      get(child(dbRef, 'Users/' + user.uid)).then((snapshot) => {
        const data = snapshot.val();
        let elementToRemove = data.items.indexOf(payload)
        let newData = data.items.filter(function (f) { return f == payload })
        if (elementToRemove !== -1 && newData.length !== 1) {
          data.items.splice(elementToRemove, 1)
        }
        update(ref(db, 'Users/' + user.uid), {
          items: data.items
        });
      })
    },
    async ADD_TO_BASKET({ commit }, payload) {
      const db = getDatabase()
      const dbRef = ref(getDatabase())
      let user = getAuth().currentUser
      get(child(dbRef, 'Users/' + user.uid )).then ((snapshot) => {
        const data = snapshot.val();
        if (data.items == null) {
          update(ref(db, 'Users/' + user.uid), {
            items: [payload]
          });
        } else {
          let newData = [...data.items, payload]
          update(ref(db, 'Users/' + user.uid), {
            items: newData
          });
        }               
      })  
    },
    async GET_BASKET({ commit, state }) {
      const db = getDatabase();
      const auth = getAuth()
      onAuthStateChanged(auth, async user => {
        if (user.uid !== 'SyQvjsJTdjfabSrwlLJX0rlFv5A3') {
          const itemRef = ref(db, 'TravelBags')
          const userRef = ref(db, 'Users/' + user.uid);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            onValue(itemRef, (snapshot) => {
              let basketArray = []
              const itemData = snapshot.val()
              for (let key in itemData) {
                if(data.items) {
                  if (data.items.includes(key)) {
                    let basketItem = {
                      id: itemData[key].id,
                      image: itemData[key].image,
                      price: itemData[key].price,
                      title: itemData[key].title,
                    }
                    basketArray.push(basketItem)
                  }  
                }
              } 
              commit("SET_BASKET", basketArray)            
            })
          })
        }
      })
    }
  }
}