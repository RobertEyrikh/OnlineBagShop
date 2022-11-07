import { ItemsCard } from "@/components/ItemsCard"
import axios from 'axios'


export default {
  state: {
    item: null
  },
  mutations: {
    SET_ITEM_TO_NULL: (state) => {
      state.item = null
    }
  },
  actions: {
    async POST_ITEMS_ON_API({ state }) {
      const item = state.item
      await axios.post("https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags.json", {
        item
      })
    }

  },
}