import axios from 'axios'
import { getStorage, ref as storageReference, uploadBytesResumable } from "firebase/storage";
import { getDatabase, ref, child, push, update } from "firebase/database";
import { ItemsCard } from "@/components/ItemsCard";


export default {
  state: {
    newItem: null,
    imageRef: null,
    progress: 0,
    id: null,
  },
  mutations: {
    SET_ITEM_TO_NULL: (state) => {
      state.newItem = null
    },
    SET_PROGRESS_TO_NULL: (state) => {
      state.progress = 0
    },
    SET_IMAGE: (state, payload) => {
      state.imageRef = payload
    },
    SET_ITEM: (state, payload) => {
      state.newItem = payload
    },
    SET_LOAD_PROGRESS: (state, payload) => {
      state.progress = payload
    },
    NEW_POST: (state, payload) => {
      state.newItem = payload
    },
    GET_CARD_ID: (state, payload) => {
      state.id = payload
    }
  },
  getters: {

  },
  actions: {
    async POST_ITEMS_ON_API({ state, commit }, payload) { 
      const newItem = new ItemsCard ( {
        image: payload.image,
        price: payload.price,
        id: payload.id,
        title: payload.title,
        shoppingBag: payload.shoppingBag,
    })
      const imageRef = state.imageRef
      const storageRef = storageReference(getStorage(), 'files/' + newItem.image);
      const uploadItem = uploadBytesResumable(storageRef, imageRef)
      const newPostKey = push(child(ref(getDatabase()), 'travelBags')).key
      const url = "https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags"
      await axios.put(`${url}/${newPostKey}.json`, { ...newItem, id: newPostKey }) 
      
      commit('SET_LOAD_PROGRESS', uploadItem.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done')
        })
      )
      commit('SET_ITEM_TO_NULL')
      },

    async DELETE_ITEM ({ commit }, id) {
      try {
        await axios.delete(`https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags/${id}.json`)
        
      } catch(e) {}
    },

    async UPDATE_ITEM ({ state, commit }, payload) {
      const url = "https://lethermanshop-default-rtdb.asia-southeast1.firebasedatabase.app/TravelBags"
      const changedItem = new ItemsCard( {
        image: payload.image,
        price: payload.price,
        title: payload.title,
        id: state.id,
      } )
      await axios.put(`${url}/${changedItem.id}.json`,  changedItem ) 
      const imageRef = state.imageRef
      const storageRef = storageReference(getStorage(), 'files/' + changedItem.image);
      const uploadItem = uploadBytesResumable(storageRef, imageRef)


      commit('SET_LOAD_PROGRESS', uploadItem.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done')
        })
      )
      commit('SET_ITEM_TO_NULL')
    },
  }
}