import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB-WuHwZoUvZSNYQ5x-z2daMkgX39JgMUM',
  authDomain: 'bracketize-12ae4.firebaseapp.com',
  databaseURL: 'https://bracketize-12ae4.firebaseio.com',
  projectId: 'bracketize-12ae4',
  storageBucket: '',
  messagingSenderId: '47702624943'
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
