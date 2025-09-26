import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../service/AuthService'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const response = await authService.login({ email, password });
      login(response.access_token, { email });
      console.log('Login riuscito:', response);
      // Salva anche il refresh token
      authService.setTokens(response.access_token, response.refresh_token);
      // Reindirizza alla dashboard o alla home
      navigate('/dashboard')
    } catch (error) {
      setError('Errore durante il login')
      console.error('Errore durante il login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Accedi</h1>
        <form onSubmit={handleLogin} className="login-form">          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Inserisci la tua email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Inserisci la tua password"
            />
          </div>
          
          {error && <div className="error-message">{error}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Accesso in corso...' : 'Accedi'}
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#forgot-password">Password dimenticata?</a>
          <Link to="/register" className="link-button">
            Crea nuovo account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
