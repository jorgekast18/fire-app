var firebaseConfig = {
  apiKey: "AIzaSyA_UHtD_eKmoO7VzvsKThcMOM28sRAjIdU",
  authDomain: "fire-app-86571.firebaseapp.com",
  databaseURL: "https://fire-app-86571.firebaseio.com",
  projectId: "fire-app-86571",
  storageBucket: "fire-app-86571.appspot.com",
  messagingSenderId: "1048799847274",
  appId: "1:1048799847274:web:99aba5e9882c354593bb13",
  measurementId: "G-MRKN011QJ1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const func = firebase.functions();
