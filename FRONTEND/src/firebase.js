import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChw3YM_O3dPLUP4k4wqisNBsxUS2uwtsA",
  authDomain: "research-management-storage.firebaseapp.com",
  projectId: "research-management-storage",
  storageBucket: "research-management-storage.appspot.com",
  messagingSenderId: "56902860346",
  appId: "1:56902860346:web:594d27390fd342714b3f03"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
