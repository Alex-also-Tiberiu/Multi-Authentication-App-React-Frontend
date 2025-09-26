import { createContext, useContext, useEffect, useState } from 'react'
import { authService } from '../service/AuthService'

interface AuthContextType {
  isAuthenticated: boolean
  user: any | null
  login: (token: string, userData: any) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Controlla se l'utente è già autenticato all'avvio
    const token = authService.getToken()
    if (token) {
      setIsAuthenticated(true)
      // Qui potresti fare una chiamata API per ottenere i dati dell'utente
    }
    setLoading(false)
  }, [])

  const login = (token: string, userData: any) => {
    authService.setToken(token)
    setIsAuthenticated(true)
    setUser(userData)
  }

  const logout = () => {
    authService.logout()
    setIsAuthenticated(false)
    setUser(null)
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
