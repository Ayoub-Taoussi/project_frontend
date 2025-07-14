// Gestion de l'authentification
class AuthManager {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('reviewboost_token');
    if (token) {
      this.currentUser = JSON.parse(localStorage.getItem('reviewboost_user'));
    }
  }

  async login(email, password) {
    try {
      // Simulation d'une connexion (à remplacer par votre API)
      const response = await this.mockApiCall('/auth/login', {
        email,
        password
      });

      if (response.success) {
        this.currentUser = response.user;
        localStorage.setItem('reviewboost_token', response.token);
        localStorage.setItem('reviewboost_user', JSON.stringify(response.user));
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Erreur de connexion' };
    }
  }

  async signup(userData) {
    try {
      const response = await this.mockApiCall('/auth/signup', userData);
      
      if (response.success) {
        return { success: true, user: response.user };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }
  }

  async forgotPassword(email) {
    try {
      const response = await this.mockApiCall('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      return { success: false, error: 'Erreur lors de l\'envoi' };
    }
  }

  async resetPassword(token, newPassword) {
    try {
      const response = await this.mockApiCall('/auth/reset-password', {
        token,
        password: newPassword
      });
      return response;
    } catch (error) {
      return { success: false, error: 'Erreur lors de la réinitialisation' };
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('reviewboost_token');
    localStorage.removeItem('reviewboost_user');
    window.location.href = '/auth/login.html';
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/auth/login.html';
      return false;
    }
    return true;
  }

  // Simulation d'appels API (à remplacer par de vrais appels)
  async mockApiCall(endpoint, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (endpoint === '/auth/login') {
          if (data.email === 'demo@reviewboost.com' && data.password === 'demo123') {
            resolve({
              success: true,
              token: 'mock-jwt-token',
              user: {
                id: 1,
                email: data.email,
                name: 'Demo User',
                business: 'Demo Business',
                plan: 'boost'
              }
            });
          } else {
            resolve({ success: false, error: 'Email ou mot de passe incorrect' });
          }
        } else if (endpoint === '/auth/signup') {
          resolve({
            success: true,
            user: {
              id: Date.now(),
              email: data.email,
              name: data.name,
              business: data.business
            }
          });
        } else if (endpoint === '/auth/forgot-password') {
          resolve({ success: true, message: 'Email de réinitialisation envoyé' });
        } else if (endpoint === '/auth/reset-password') {
          resolve({ success: true, message: 'Mot de passe réinitialisé' });
        }
      }, 1000);
    });
  }
}

// Instance globale
const authManager = new AuthManager();