import {createContext, FunctionComponent, ReactNode, useContext, useEffect, useState} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'
import {auth} from '@/service/firebase'

interface AuthContextValue {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
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
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider')
  return ctx
}