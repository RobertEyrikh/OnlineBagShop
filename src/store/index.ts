import { createStore } from 'vuex';
import auth from './auth';
import addCard from './addCard';
import getCard from './getCard';
import userInfo from './userInfo';
import basket from './basket'
import wishlist from './wishlist'
import reviews from './reviews'

export default createStore({
  modules: {
    auth: auth,
    addCard,
    getCard,
    userInfo,
    basket,
    wishlist,
    reviews,
  }
})
