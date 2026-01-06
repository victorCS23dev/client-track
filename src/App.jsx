import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { AuthProvider, useAuth } from './context/AuthContext'
import './App.css'

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando...
      </div>
    )
  }

  return (
    <Routes>
      {/* 🔴 Login protegido */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <Login />
        }
      />

      {/* 🔒 Ruta protegida */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
