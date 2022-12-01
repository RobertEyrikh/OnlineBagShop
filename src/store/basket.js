import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, update, remove, onValue, get, child } from "firebase/database";

export default {
  state: {
    itemsCounter: '',
    basket: []
  },
  mutations: {
    SET_BASKET(state, payload) {
      state.basket = payload
    },
  },

  actions: {
    async GET_ITEMS_QTY({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      const itemRef = ref(db, 'TravelBags')
      const userRef = ref(db, 'Users/' + user.uid);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        //let newData = data.items.filter(function (f) { return f !== typeof(i) })
        // for (let i = 0; i < data.items.length; i++) {
        //   console.log(data.items[i])
        //   if (data.items[i]) {

        //   }
        // }        
      })
    },
    async REMOVE_SAME_TYPES_ITEMS({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      const dbRef = ref(getDatabase())
      get(child(dbRef, 'Users/' + user.uid)).then((snapshot) => {
        const data = snapshot.val();
        console.log(data.items)
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
        console.log(data)
        if (data.items == null) {
          update(ref(db, 'Users/' + user.uid), {
            items: [payload]
          });
        } else {
          let newData = [...data.items, payload]
          console.log(newData)
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
        if (user) {
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