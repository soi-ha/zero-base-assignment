import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueCookies from 'vue-cookies';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

import firebaseKey from './firebaseKey';

// Initialize Firebase
const firebaseApp = initializeApp(firebaseKey);

// Initialize Realtime Database and get a reference to the service
getDatabase(firebaseApp);

Vue.config.productionTip = false;
Vue.use(VueCookies);

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
