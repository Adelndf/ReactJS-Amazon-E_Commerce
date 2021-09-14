import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCHx7tlnjYH6-zLG6KLISPeXWVtZod5ApU",
  authDomain: "clone-ndf.firebaseapp.com",
  projectId: "clone-ndf",
  storageBucket: "clone-ndf.appspot.com",
  messagingSenderId: "425301459046",
  appId: "1:425301459046:web:db5f51a2593037713fada7",
  measurementId: "G-822RH0S5ZM"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
