import axios from 'axios'
import { ItemsCard } from "@/components/ItemsCard";
import ItemsCardContainer from "@/components/ItemsCardContainer";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default {
  state: () => ({
    item: null,
    imageRef: null,
    allItemsCard: [],
  }),
  getters: {
  },
  mutations: {
    PUSH_ALL_ITEMS_CARD (state, payload) {
      state.allItemsCard = payload
    }
  },
  actions: {
    async GET_ITEMS_FROM_API ({ state, commit }) {
      let allItems 
      let allItemsCard = new ItemsCardContainer([])

      await axios
        .get("https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags.json")
        .then(response => (allItems = response.data))

      for (let key in allItems) {
        await getDownloadURL(ref(getStorage(), 'files/' + allItems[key].item.image))
          .then((url) => {
            const item = new ItemsCard({
              image: url,
              price: allItems[key].item.price,
              id: allItems[key].item.id,
              title: allItems[key].item.title,
              shoppingBag: '../assets/shoppingBag.webp',
            })
            allItemsCard.newCardAdd(item)
          })

      }
      commit('PUSH_ALL_ITEMS_CARD', allItemsCard)
    }
  }
}