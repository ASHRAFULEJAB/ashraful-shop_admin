// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBuRoj9zNAqw3L-B1liyUZIzv0VlWcrOn4',
  authDomain: 'eat-now-admin.firebaseapp.com',
  projectId: 'eat-now-admin',
  storageBucket: 'eat-now-admin.appspot.com',
  messagingSenderId: '952690495710',
  appId: '1:952690495710:web:1be43d30de328e85b1b24f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)

export { storage, db }
