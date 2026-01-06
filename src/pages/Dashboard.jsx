import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Profile from '../components/Profile'
import Clients from '../components/Clients'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('clients')

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 overflow-auto">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'clients' && <Clients />}
      </div>
    </div>
  )
}
