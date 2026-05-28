import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    return localStorage.getItem('mytube_admin') === 'true'
  })

  const login = (username, password) => {
    // Simple hardcoded admin credentials — change as needed
    if (username === 'admin@gmail.com' && password === 'avr-anivortex') {
      setAdmin(true)
      localStorage.setItem('mytube_admin', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    setAdmin(false)
    localStorage.removeItem('mytube_admin')
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
