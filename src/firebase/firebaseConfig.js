import firebase from 'firebase/app'
import "firebase/auth"


 const firebaseConfig = {

  apiKey: "AIzaSyAjcwffiZB8S4Yy8Ni1KE3tGbuxkwzhqdg",
  authDomain: "lateral-replica-338110.firebaseapp.com",
  projectId: "lateral-replica-338110",
  storageBucket: "lateral-replica-338110.appspot.com",
  messagingSenderId: "741775479046",
  appId: "1:741775479046:web:7585d0420efa57ff868e87",
  measurementId: "G-6N5PN7LFWY"
}


export const app= firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider(); 

export {auth, googleAuthProvider, facebookAuthProvider}