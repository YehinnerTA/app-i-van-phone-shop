import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAMvH6zIhp_mAFnDTWptYgB-KyHm2mLRxE",
    authDomain: "ivanphone-89260.firebaseapp.com",
    projectId: "ivanphone-89260",
    storageBucket: "ivanphone-89260.appspot.com",
    messagingSenderId: "965095594661",
    appId: "1:965095594661:web:09f8bf9d757b767f2dcb4c",
    measurementId: "G-ZC01V5KX7K"
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const app_auth = getAuth(app);
export const app_DB = getFirestore(app);