import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Caricamento...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Reindirizza al login se non autenticato
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
