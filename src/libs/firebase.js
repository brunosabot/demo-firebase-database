import firebase from 'firebase';
import config from '../config/firebase';

const firebaseConfig = {
  apiKey: config.apiKey || '',
  authDomain: config.authDomain || '',
  databaseURL: config.databaseURL || '',
  projectId: config.projectId || '',
  storageBucket: config.storageBucket || '',
  messagingSenderId: config.messagingSenderId || '',
};

firebase.initializeApp(firebaseConfig);
