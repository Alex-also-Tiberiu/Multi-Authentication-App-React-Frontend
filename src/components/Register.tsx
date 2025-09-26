import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../service/AuthService'

type Role = 'USER' | 'MANAGER' | 'ADMIN';

function Register() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<Role>('USER')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess('')

    // Validazione password
    if (password !== confirmPassword) {
      setError('Le password non coincidono')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('La password deve essere di almeno 6 caratteri')
      setIsLoading(false)
      return
    }    try {
      console.log('Inizio registrazione...', { firstname, lastname, email, password: '***', role })
      const response = await authService.register({ 
        firstname, 
        lastname, 
        email, 
        password, 
        role 
      });
      console.log('Risposta registrazione:', response)
      
      // Se riceviamo access_token, la registrazione è riuscita
      if (response.access_token) {
        console.log('Registrazione riuscita, mostro messaggio di successo')
        setSuccess('Account creato con successo! Ora puoi accedere.')
        // Dopo 2 secondi torna al login
        setTimeout(() => {
          console.log('Reindirizzo al login')
          navigate('/login')
        }, 2000)
      } else {
        console.log('Registrazione fallita: nessun token ricevuto')
        setError('Errore durante la registrazione: risposta del server non valida')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Errore durante la registrazione';
      setError(errorMessage);
      console.error('Errore durante la registrazione:', error);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Crea Account</h1>        <form onSubmit={handleRegister} className="login-form">
          <div className="form-group">
            <label htmlFor="firstname">Nome</label>
            <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              placeholder="Inserisci il tuo nome"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Cognome</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              placeholder="Inserisci il tuo cognome"
            />
          </div>

          <div className="form-group">
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
              minLength={6}
            />
          </div>          <div className="form-group">
            <label htmlFor="confirmPassword">Conferma Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Conferma la tua password"
              minLength={6}
            />
          </div>          <div className="form-group">
            <label htmlFor="role">Ruolo</label>            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              required
            >
              <option value="USER">Utente</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Amministratore</option>
            </select>
          </div>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creazione in corso...' : 'Crea Account'}
          </button>
        </form>
          <div className="login-footer">
          <Link to="/login" className="link-button">
            ← Torna al login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
