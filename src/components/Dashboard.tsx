import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Dashboard() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">        <div className="welcome-card">
          <h2>Benvenuto{user?.username ? `, ${user.username}` : ''}!</h2>
          <p>Hai effettuato l'accesso con successo al sistema di autenticazione multi-fattore.</p>
          {user?.email && <p>Email: {user.email}</p>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
