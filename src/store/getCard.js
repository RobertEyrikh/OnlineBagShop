import axios from 'axios'
import { ItemsCard } from "@/components/ItemsCard";
import ItemsCardContainer from "@/components/ItemsCardContainer";
import { getStorage, ref as storageReference, getDownloadURL } from "firebase/storage";
import { getDatabase, ref, onValue, } from "firebase/database";

export default {
  state: () => ({
    item: null,
    imageRef: null,
    allItemsCard: [],
    thisItem: {},
    travelBags: [],
    wallets: [],
    briefcases: [],
    backpacks: [],
    belts: [],
  }),
  mutations: {
    PUSH_ALL_ITEMS_CARD (state, payload) {
      state.allItemsCard = payload
    },
    SET_THIS_ITEM (state, payload) {
      state.thisItem = payload
    },
    PUSH_ITEMS_BY_CATEGORY (state, payload) {
      state[payload.category] = payload.data
    }
  },
  actions: {
    async GET_ITEMS_BY_CATEGORY({ commit }, payload) {
      let allItems
      let allItemsCard = new ItemsCardContainer([])
      await axios
        .get("https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags.json")
        .then(response => (allItems = response.data))

      for (let key in allItems) {
        if (allItems[key].category == payload) {
          await getDownloadURL(storageReference(getStorage(), 'files/' + allItems[key].image))
          .then((url) => {
              const item = new ItemsCard({
                image: url,
                price: allItems[key].price,
                id: allItems[key].id,
                title: allItems[key].title,
                category: allItems[key].category,
                body: allItems[key].body,
              })
              allItemsCard.newCardAdd(item)
          })
        }
      }
      let itemWithCategory = {
        data: allItemsCard,
        category: payload
      }
      commit('PUSH_ITEMS_BY_CATEGORY', itemWithCategory)
    },
    async GET_ITEMS_FROM_API ({ commit }) {
      let allItems 
      let allItemsCard = new ItemsCardContainer([])
      await axios
        .get("https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags.json")
        .then(response => (allItems = response.data))
        for (let key in allItems) {
          await getDownloadURL(storageReference(getStorage(), 'files/' + allItems[key].image))
            .then((url) => {
              const item = new ItemsCard({
                image: url,
                price: allItems[key].price,
                id: allItems[key].id,
                title: allItems[key].title,
                category: allItems[key].category,
                body: allItems[key].body,
              })
              allItemsCard.newCardAdd(item)
            })  
        } 
      commit('PUSH_ALL_ITEMS_CARD', allItemsCard)      
    },
    async GET_THIS_ITEM ({ commit }, payload) {
      const db = getDatabase();
      const itemRef = ref(db, 'TravelBags')
      onValue(itemRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          if (key == payload) {
            getDownloadURL(storageReference(getStorage(), 'files/' + data[key].image))
            .then((url) => {
              data[key].image = url
              commit('SET_THIS_ITEM', data[key])
            })
            // console.log(data[key])
           // commit('SET_THIS_ITEM', data[key])
          }
        }
      })
    }, 
    GET_THIS_ITEM0({ commit }, payload) {
      const db = getDatabase();
      const itemRef = ref(db, 'TravelBags')
      onValue(itemRef, (snapshot) => {
        const data = snapshot.val();
        for (let key in data) {
          if (key == payload) {
            commit('SET_THIS_ITEM', data[key])
            console.log(data[key])
          }
        }
      })
    }, 
  }
}