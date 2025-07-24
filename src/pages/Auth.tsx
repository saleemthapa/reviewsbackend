import React, { useState, useEffect } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { OTPVerification } from '@/components/auth/OTPVerification';

type AuthView = 'login' | 'register' | 'otp';

const AUTH_VIEW_KEY = 'auth.currentView';
const AUTH_EMAIL_KEY = 'auth.registrationEmail';

const Auth: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(AUTH_VIEW_KEY);
      if (stored === 'login' || stored === 'register' || stored === 'otp') {
        return stored;
      }
    }
    return 'login';
  });
  const [registrationEmail, setRegistrationEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(AUTH_EMAIL_KEY) || '';
    }
    return '';
  });

  // Persist currentView and registrationEmail to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_VIEW_KEY, currentView);
    }
  }, [currentView]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_EMAIL_KEY, registrationEmail);
    }
  }, [registrationEmail]);

  // If on OTP view but no registrationEmail, fallback to register
  useEffect(() => {
    if (currentView === 'otp' && !registrationEmail) {
      setCurrentView('register');
    }
  }, [currentView, registrationEmail]);

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
};

export default Auth;