import axios from 'axios'
import { getStorage, ref as storageReference, uploadBytesResumable } from "firebase/storage";


export default {
  state: {
    item: null,
    imageRef: null,
    progress: 0,
  },
  mutations: {
    SET_ITEM_TO_NULL: (state) => {
      state.item = null
    },
    SET_PROGRESS_TO_NULL: (state) => {
      state.progress = 0
    },
    SET_IMAGE: (state, payload) => {
      state.imageRef = payload
    },
    SET_ITEM: (state, payload) => {
      state.item = payload
    },
    SET_LOAD_PROGRESS: (state, payload) => {
      state.progress = payload
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
      const uploadItem = uploadBytesResumable(storageRef, imageRef)
      commit('SET_LOAD_PROGRESS', uploadItem.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done')
        })
      )
      commit('SET_ITEM_TO_NULL')
      //commit('SET_PROGRESS_TO_NULL')
    },
  },
}