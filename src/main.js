// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyAPMoNW5hHiITE8YW6l8w8bzDasjn1QXjY',
  authDomain: 'charagit-e5789.firebaseapp.com',
  databaseURL: 'https://charagit-e5789.firebaseio.com',
  projectId: 'charagit-e5789',
  storageBucket: 'charagit-e5789.appspot.com',
  messagingSenderId: '860621407358'
};
firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
