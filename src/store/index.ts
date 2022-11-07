import { createStore } from 'vuex';
import auth from './auth';
import addCard from './addCard';

export default createStore({
  modules: {
    auth: auth,
    addCard
  }
})
