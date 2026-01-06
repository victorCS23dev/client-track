import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // 🔹 Hidratar sesión al iniciar la app
    useEffect(() => {
        try {
            const stored = localStorage.getItem('ct_user')
            if (stored) {
                setUser(JSON.parse(stored))
            }
        } catch (e) {
            console.error('Error loading user from storage', e)
        } finally {
            setLoading(false)
        }
    }, [])

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API_BASE}/api/auth/login/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) return false

            const data = await res.json()

            const userData = {
                id: data.employee.id,
                name: data.employee.name,
                email: data.employee.email,
                accessToken: data.access,
                refreshToken: data.refresh
            }

            localStorage.setItem('ct_user', JSON.stringify(userData))
            localStorage.setItem('ct_access_token', data.access)
            localStorage.setItem('ct_refresh_token', data.refresh)

            setUser(userData)
            return true
        } catch {
            return false
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.clear()
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)