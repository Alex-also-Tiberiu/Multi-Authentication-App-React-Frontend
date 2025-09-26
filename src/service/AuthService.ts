type Role = 'USER' | 'MANAGER' | 'ADMIN';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role;
}

interface RegisterResponse {
  access_token: string;
  refresh_token: string;
}

class AuthService {
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
    
    const response = await fetch(`${this.baseUrl}/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Authorization': `Basic ${encodedCredentials}`
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Errore HTTP: ${response.status}`);
    }

    return response.json();
  }

  async register(registerData: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch(`${this.baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Errore HTTP: ${response.status}`);
    }

    return response.json();
  }
  async logout(): Promise<void> {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Mantengo questo per compatibilità con il codice esistente
  getToken(): string | null {
    return this.getAccessToken();
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }
  isAuthenticated(): boolean {
    return this.getAccessToken() !== null;
  }
}

export const authService = new AuthService();