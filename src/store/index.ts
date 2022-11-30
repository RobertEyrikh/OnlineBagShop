import { createStore } from 'vuex';
import auth from './auth';
import addCard from './addCard';
import getCard from './getCard';
import userInfo from './userInfo';
import basket from './basket'

export default createStore({
  modules: {
    auth: auth,
    addCard,
    getCard,
    userInfo,
    basket,
  }
})
