import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import InstitutionalBranding from './components/InstitutionalBranding';
import SecurityNotices from './components/SecurityNotices';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials for different user types
  const mockCredentials = {
    administrator: {
      email: 'admin@jk.gov.in',
      password: 'admin123',
      redirectPath: '/'
    },
    faculty: {
      email: 'faculty@jk.gov.in',
      password: 'faculty123',
      redirectPath: '/timetable-view'
    },
    student: {
      email: 'student@jk.gov.in',
      password: 'student123',
      redirectPath: '/student-portal'
    }
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { email, password, role } = formData;
      const credentials = mockCredentials?.[role];

      if (email === credentials?.email && password === credentials?.password) {
        // Store user session data
        localStorage.setItem('userSession', JSON.stringify({
          email,
          role,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));

        // Navigate to appropriate dashboard
        navigate(credentials?.redirectPath);
      } else {
        setError(`Invalid credentials. Use ${credentials?.email} / ${credentials?.password} for ${role} access.`);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - NEP Timetable Generator</title>
        <meta name="description" content="Secure login to NEP Timetable Generator - AI-powered academic scheduling system for higher education institutions" />
        <meta name="keywords" content="login, timetable, NEP 2020, academic scheduling, education management" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="flex min-h-screen">
          {/* Left Panel - Branding & Information */}
          <div className="hidden lg:flex lg:w-1/2 bg-primary/5 border-r border-border">
            <div className="flex flex-col justify-center px-12 py-16 w-full max-w-md mx-auto">
              <InstitutionalBranding />
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="flex-1 flex flex-col justify-center px-6 py-16 lg:px-12">
            <div className="w-full max-w-md mx-auto">
              {/* Mobile Branding */}
              <div className="lg:hidden mb-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                    </svg>
                  </div>
                  <h1 className="text-xl font-bold text-foreground mb-1">
                    NEP Timetable Generator
                  </h1>
                  <p className="text-muted-foreground text-sm mb-6">
                    Government of Jammu and Kashmir
                  </p>
                </div>
              </div>

              {/* Login Form */}
              <div className="bg-card border border-border rounded-xl p-8 elevation-2">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-muted-foreground">
                    Sign in to access the timetable management system
                  </p>
                </div>

                <LoginForm 
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />

                {/* Additional Information */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-4">
                      By signing in, you agree to our Terms of Service and Privacy Policy
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                      <span>© {new Date()?.getFullYear()} Government of J&K</span>
                      <span>•</span>
                      <span>Version 2.1.0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Notices - Mobile */}
              <div className="lg:hidden mt-8">
                <SecurityNotices />
              </div>
            </div>
          </div>

          {/* Security Panel - Desktop */}
          <div className="hidden xl:flex xl:w-80 bg-muted/30 border-l border-border">
            <div className="flex flex-col justify-center px-6 py-16 w-full">
              <SecurityNotices />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;