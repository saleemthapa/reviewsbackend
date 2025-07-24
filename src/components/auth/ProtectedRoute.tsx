import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { OTPVerification } from './OTPVerification';
import { useState } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

type AuthView = 'login' | 'register' | 'otp';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [registrationEmail, setRegistrationEmail] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        {currentView === 'login' && (
          <LoginForm 
            onSwitchToRegister={() => setCurrentView('register')}
          />
        )}
        
        {currentView === 'register' && (
          <RegisterForm
            onSwitchToLogin={() => setCurrentView('login')}
            onRegistrationSuccess={(email) => {
              setRegistrationEmail(email);
              setCurrentView('otp');
            }}
          />
        )}
        
        {currentView === 'otp' && (
          <OTPVerification
            email={registrationEmail}
            onVerificationSuccess={() => setCurrentView('login')}
            onBackToRegister={() => setCurrentView('register')}
          />
        )}
      </div>
    );
  }

  return <>{children}</>;
};