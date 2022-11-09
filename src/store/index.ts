import { createStore } from 'vuex';
import auth from './auth';
import addCard from './addCard';
import getCard from './getCard';

export default createStore({
  modules: {
    auth: auth,
    addCard,
    getCard
  }
})
