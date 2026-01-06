// Helper para peticiones a la API con autenticación
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export async function apiCall(endpoint, options = {}) {
    const accessToken = localStorage.getItem('ct_access_token')
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    // Agregar token si existe
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`
    }

    try {
        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers
        })

        // Si recibe 401, el token expiró
        if (res.status === 401) {
            console.log('401 recibido, token:', accessToken)
            localStorage.removeItem('ct_access_token')
            localStorage.removeItem('ct_refresh_token')
            localStorage.removeItem('ct_user')
            window.location.href = '/login'
            return res
        }

        return res
    } catch (error) {
        console.error('API call error:', error)
        throw error
    }
}
