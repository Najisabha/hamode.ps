
const AUTH_TOKEN_KEY = 'hamoude_auth_token';

export const authService = {
  login: (): void => {
    // In a real app, a secure JWT would be stored.
    localStorage.setItem(AUTH_TOKEN_KEY, 'authenticated');
  },
  
  logout: (): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
  },
  
  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_TOKEN_KEY) === 'authenticated';
  }
};
