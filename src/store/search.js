import axios from 'axios'
import { getDatabase, ref, onValue, } from "firebase/database";

export default {
  state: {
    foundsItems: []
  },
  mutations: {
    SET_FOUNDS_ITEM(state, payload) {
      state.foundsItems = payload
    }
  },
  actions: {
    GET_ITEMS_BY_NAME({ commit }, payload) {
      const db = getDatabase()
      const itemRef = ref(db, 'TravelBags/');
      let foundsItems = []
      onValue(itemRef, (snapshot) => {
        const data = snapshot.val();  
        for (let key in data) {
          if (data[key].title.toLowerCase().indexOf(payload.toLowerCase()) != -1) {
            let itemTitle = {
              title: data[key].title,
              id: data[key].id,
            }
            foundsItems.push(itemTitle)
          }
        }
        commit('SET_FOUNDS_ITEM', foundsItems)
      })
    }
  },
}