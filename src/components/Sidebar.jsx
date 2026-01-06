import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Sidebar({ activeTab, setActiveTab }) {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <div className="w-64 bg-gray-900 text-white p-6 flex flex-col">
            {/* Logo */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-purple-400">Client Track</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${activeTab === 'profile'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                >
                    👤 Perfil
                </button>
                <button
                    onClick={() => setActiveTab('clients')}
                    className={`w-full text-left px-4 py-3 rounded-lg transition ${activeTab === 'clients'
                            ? 'bg-purple-600 text-white'
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                >
                    📋 Clientes
                </button>
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-700 pt-4">
                <button onClick={handleLogout} className="w-full text-left text-gray-400 hover:text-white transition">
                    🚪 Cerrar Sesión
                </button>
            </div>
        </div>
    )
}
