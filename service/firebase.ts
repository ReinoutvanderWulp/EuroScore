import {getApp, getApps, initializeApp} from 'firebase/app'
import {getAuth, getReactNativePersistence, initializeAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

// De Firebase web-config is niet geheim: de beveiliging zit in je Firestore-regels.
const firebaseConfig = {
  apiKey: 'AIzaSyCOQ3TgHn4IVTzCCTiPDKOauQzqvMDTqes',
  authDomain: 'euroscore-c2086.firebaseapp.com',
  projectId: 'euroscore-c2086',
  storageBucket: 'euroscore-c2086.firebasestorage.app',
  messagingSenderId: '316004957250',
  appId: '1:316004957250:web:c0a16bb1a27d2359b901db',
}

// Voorkomt dubbele initialisatie bij Fast Refresh
const isFirstInit = getApps().length === 0
const app = isFirstInit ? initializeApp(firebaseConfig) : getApp()

// Met AsyncStorage blijft de gebruiker ingelogd na het herstarten van de app
export const auth = isFirstInit
  ? initializeAuth(app, {persistence: getReactNativePersistence(AsyncStorage)})
  : getAuth(app)

export const db = getFirestore(app)
