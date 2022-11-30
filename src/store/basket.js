import { getAuth } from "firebase/auth";
import { getDatabase, ref, update, push } from "firebase/database";

export default {
  state: {
    itemsCounter: '',
    basket: []
  },
  mutations: {
    SET_ITEM(state, payload) {
      state.basket = payload
    },
  },

  actions: {
    async ADD_TO_BASKET({ commit }, payload) {
      const db = getDatabase()
      let user = getAuth().currentUser
      push(ref(db, 'Users/' + user.uid), {
        items: payload,
      });
      //commit('SET_ITEM', this.item)
    },
  }
}