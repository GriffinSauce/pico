import firebase from 'firebase/app';
import 'firebase/storage';

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAu5oMyaph8EO8hDLYSBwgciLHIr3IRq7A',
  authDomain: 'pico-link.firebaseapp.com',
  databaseURL: 'https://pico-link.firebaseio.com',
  projectId: 'pico-link',
  storageBucket: 'pico-link.appspot.com',
  messagingSenderId: '157640793979',
  appId: '1:157640793979:web:4105141872166af23667de',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const storage = firebase.storage();

export { storage, firebase as default };
