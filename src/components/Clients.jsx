import { useState, useEffect } from 'react'
import ClientForm from './ClientForm'
import { useAuth } from '../context/AuthContext'
import { apiCall } from '../api/client'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      try {
        const res = await apiCall('/api/clients/', { method: 'GET' })
        if (!res.ok) throw new Error('Error fetching clients')
        const data = await res.json()
        setClients(data || [])
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar los clientes')
      } finally {
        setLoading(false)
      }
    }
    fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleAddClient = async (newClient) => {
    try {
      if (editingClient) {
        // Update
        const res = await apiCall(`/api/clients/${editingClient.id}/`, {
          method: 'PUT',
          body: JSON.stringify(newClient)
        })
        if (!res.ok) throw new Error('Error updating client')
        const updated = await res.json()
        setClients(clients.map(c => (c.id === editingClient.id ? updated : c)))
        setEditingClient(null)
      } else {
        // Create
        const res = await apiCall('/api/clients/', {
          method: 'POST',
          body: JSON.stringify(newClient)
        })
        if (!res.ok) throw new Error('Error creating client')
        const created = await res.json()
        setClients(prev => [...prev, created])
      }
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert('Ocurrió un error al guardar el cliente')
    }
  }

  const handleDeleteClient = async (id) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return
    try {
      const res = await apiCall(`/api/clients/${id}/`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Error deleting')
      // optionally read response
      setClients(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      console.error(err)
      alert('No se pudo eliminar el cliente')
    }
  }

  const handleEditClient = (client) => {
    setEditingClient(client)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingClient(null)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          ➕ Nuevo Cliente
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <ClientForm
          client={editingClient}
          onSubmit={handleAddClient}
          onClose={handleCloseForm}
        />
      )}

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Cargando clientes...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg">No hay clientes registrados</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Nombre</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Teléfono</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Dirección</th>
                  <th className="px-6 py-4 text-center text-sm font-bold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {client.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{client.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{client.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{client.address}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleEditClient(client)}
                        className="text-purple-600 hover:text-purple-700 font-medium mr-4 transition"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client.id)}
                        className="text-red-600 hover:text-red-700 font-medium transition"
                      >
                        🗑️ Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
