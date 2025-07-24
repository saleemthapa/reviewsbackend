import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  confirmOTP: (token: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setAccessToken(token);
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      const response = await fetch('/bandobasta/api/v1/user/authenticate/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          role: 'ROLE_USER',
        }),
      });

      return response.ok;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const confirmOTP = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`/bandobasta/api/v1/user/authenticate/register/confirm?token=${token}`, {
        method: 'GET',
      });

      return response.ok;
    } catch (error) {
      console.error('OTP confirmation failed:', error);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/bandobasta/api/v1/user/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const result = await response.json();
        const { accessToken: token, username: user, roles } = result.data;
        
        setAccessToken(token);
        setUser({ username: user, roles });
        
        // Store in localStorage
        localStorage.setItem('accessToken', token);
        localStorage.setItem('user', JSON.stringify({ username: user, roles }));
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    accessToken,
    login,
    register,
    confirmOTP,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};