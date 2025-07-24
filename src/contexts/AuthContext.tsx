import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * NOTE: CORS (Cross-Origin Resource Sharing) issues are not caused by this frontend code,
 * but by the server not sending the appropriate CORS headers in its response.
 * 
 * However, you can check for CORS errors in the browser console (look for errors like:
 * "Access to fetch at '...' from origin '...' has been blocked by CORS policy").
 * 
 * In this code, all fetch requests are made to 'https://bandobasta-latest-5u7o.onrender.com'.
 * If that server does not allow requests from your frontend's origin, you will get CORS errors.
 * 
 * You CANNOT fix CORS by changing fetch options in the frontend (except for using only simple requests).
 * The server must send the correct 'Access-Control-Allow-Origin' header.
 * 
 * For debugging, you can add a catch block to log fetch errors, which may include CORS errors.
 */

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
      const response = await fetch('https://bandobasta-latest-5u7o.onrender.com/bandobasta/api/v1/user/authenticate/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...userData,
          role: 'ROLE_USER',
        }),
        // mode: 'cors' // This is the default for cross-origin requests in browsers
      });

      return response.ok;
    } catch (error: any) {
      // This will catch CORS errors as well as network errors
      console.error('Registration failed:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Possible CORS/network error during registration.');
      }
      return false;
    }
  };

  const confirmOTP = async (token: string): Promise<boolean> => {
    try {
      const response = await fetch(`https://bandobasta-latest-5u7o.onrender.com/bandobasta/api/v1/user/authenticate/register/confirm?token=${token}`, {
        method: 'GET',
        // mode: 'cors'
      });

      return response.ok;
    } catch (error: any) {
      console.error('OTP confirmation failed:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Possible CORS/network error during OTP confirmation.');
      }
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('https://bandobasta-latest-5u7o.onrender.com/bandobasta/api/v1/user/authenticate/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        // mode: 'cors'
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
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Possible CORS/network error during login.');
      }
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