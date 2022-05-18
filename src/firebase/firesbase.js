import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAEdyDhwzgy5nc6QvL3fcvAbSyFBYivKaE",
  authDomain: "k-app-2de9c.firebaseapp.com",
  projectId: "k-app-2de9c",
  storageBucket: "k-app-2de9c.appspot.com",
  messagingSenderId: "1033656431149",
  appId: "1:1033656431149:web:05bd8ec0ffdf8b8859bea4",
  measurementId: "G-JHPNDSS2WC"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage= getStorage();
// const analytics = getAnalytics(firebaseApp);

export {db, storage};