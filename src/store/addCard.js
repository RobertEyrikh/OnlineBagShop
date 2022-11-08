import { ItemsCard } from "@/components/ItemsCard"
import axios from 'axios'
import { getStorage, ref as storageReference, uploadBytesResumable } from "firebase/storage";


export default {
  state: {
    item: null,
    imageRef: null
  },
  mutations: {
    SET_ITEM_TO_NULL: (state) => {
      state.item = null
    },
    SET_IMAGE: (state, payload) => {
      state.imageRef = payload
    },
    SET_ITEM: (state, payload) => {
      state.item = payload
    }
  },
  actions: {
    async POST_ITEMS_ON_API({ state, commit }) {
      const item = state.item
      const imageRef = state.imageRef
      const storageRef = storageReference(getStorage(), 'files/' + item.image);
      await axios.post("https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags.json", {
        item
      });
      await uploadBytesResumable(storageRef, imageRef).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
        commit('SET_ITEM_TO_NULL')

    },
  },
}