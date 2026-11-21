import {createContext, FunctionComponent, ReactNode, useContext, useEffect, useState} from 'react'
import {
  createUserWithEmailAndPassword,
  deleteUser,
  EmailAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import {collection, getDocs, writeBatch} from 'firebase/firestore'
import { auth, db } from '@/service/firebase'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  deleteAccount: (password: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: FunctionComponent<{children: ReactNode}> = ({children}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value: AuthContextValue = {
    user,
    loading,
    signUp: async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password)
    },
    signIn: async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password)
    },
    logOut: () => signOut(auth),
    resetPassword: email => sendPasswordResetEmail(auth, email),
    deleteAccount: async password => {
      const current = auth.currentUser
      if (!current?.email) throw new Error('Not signed in')

      // 1. Opnieuw inloggen: Firebase eist een recente login om een account te verwijderen.
      //    Dit gebeurt vóór het wissen van data, zodat een fout hier niets kapotmaakt.
      const credential = EmailAuthProvider.credential(current.email, password)
      await reauthenticateWithCredential(current, credential)

      // 2. Alle scores van deze gebruiker verwijderen (alle edities)
      const rankings = await getDocs(collection(db, 'users', current.uid, 'rankings'))
      const batch = writeBatch(db)
      rankings.docs.forEach(d => batch.delete(d.ref))
      await batch.commit()

      // 3. Het account zelf verwijderen. Daarna wordt user null en stuurt de guard in
      //    app/_layout.tsx je automatisch naar het loginscherm.
      await deleteUser(current)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}