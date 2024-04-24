import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyCED8o1NJGEySmByNOGPVn5_QaJ5AT5ldg",
    authDomain: "tasklist-9ccbd.firebaseapp.com",
    projectId: "tasklist-9ccbd",
    storageBucket: "tasklist-9ccbd.appspot.com",
    messagingSenderId: "745088842637",
    appId: "1:745088842637:web:c2d1e9d0bbeceb64d05bc4",
    databaseURL: 'https://tasklist-9ccbd-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
export const dataB = getDatabase(app);