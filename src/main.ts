import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router/router'
import store from './store'
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

//import 'materialize-css/dist/js/materialize.min'

const firebaseConfig = {
    apiKey: "AIzaSyC4V5TR3V6aMb9JTHJ6ugca2wG391S60AM",
    authDomain: "lethermanshop.firebaseapp.com",
    projectId: "lethermanshop",
    storageBucket: "lethermanshop.appspot.com",
    messagingSenderId: "333837194287",
    appId: "1:333837194287:web:e4be59e8bf92e9af1fe2da",
    measurementId: "G-ELHMB58GF0"
};



const app = initializeApp(firebaseConfig);

createApp(App).use(store).use(router).mount('#app')
