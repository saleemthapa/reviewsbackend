import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { OTPVerification } from '@/components/auth/OTPVerification';

type AuthView = 'login' | 'register' | 'otp';

const Auth: React.FC = () => {
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [registrationEmail, setRegistrationEmail] = useState('');

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