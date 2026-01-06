import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { apiCall } from '../api/client'

export default function Profile() {
    const { user } = useAuth()
    const [employee, setEmployee] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!user?.accessToken) return

        const fetchProfile = async () => {
            setLoading(true)
            setError(null)

            try {
                const res = await apiCall('/api/me/')
                
                if (!res.ok) throw new Error('Unauthorized')

                const data = await res.json()
                setEmployee(data)
            } catch (err) {
                console.error(err)
                setError('No se pudieron cargar los datos del perfil')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [user])

    if (loading) {
        return <div className="p-8 text-center text-gray-500">Cargando perfil...</div>
    }

    if (error) {
        return <div className="p-8 text-center text-red-500">{error}</div>
    }

    if (!employee) {
        return <div className="p-8 text-center text-gray-500">No se encontraron datos</div>
    }

    return (
        <div className="p-8">
            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

                <div className="bg-white rounded-lg shadow-lg p-8">
                    <div className="flex justify-center mb-6">
                        <img
                            src={employee.avatar || 'https://via.placeholder.com/150'}
                            alt={employee.name}
                            className="w-32 h-32 rounded-full border-4 border-purple-600"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre
                            </label>
                            <p className="bg-gray-50 px-4 py-3 rounded-lg">
                                {employee.name}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Correo
                            </label>
                            <p className="bg-gray-50 px-4 py-3 rounded-lg">
                                {employee.email}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Estado
                            </label>
                            <p className="bg-gray-50 px-4 py-3 rounded-lg">
                                {employee.is_active ? 'Activo' : 'Inactivo'}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Fecha de creación
                            </label>
                            <p className="bg-gray-50 px-4 py-3 rounded-lg">
                                {new Date(employee.created_at).toLocaleDateString('es-ES')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
