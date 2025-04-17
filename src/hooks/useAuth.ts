import { useState, useEffect } from 'react';

interface User {
  email: string;
  isAuthenticated: boolean;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem('user');
      console.log('🔍 Checking stored user:', storedUser);
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          // Validate stored user data
          if (parsedUser && typeof parsedUser === 'object' && 
              'email' in parsedUser && 'isAuthenticated' in parsedUser) {
            console.log('✅ Found valid stored user:', parsedUser);
            setUser(parsedUser);
          } else {
            console.warn('⚠️ Invalid stored user data format');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('❌ Error parsing stored user:', error);
          localStorage.removeItem('user');
        }
      } else {
        console.log('ℹ️ No stored user found');
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    console.log('🔑 Login attempt:', { email });
    
    if (email === 'forecasting@kemppi.com' && password === 'laatu') {
      const userData = {
        email: 'forecasting@kemppi.com',
        isAuthenticated: true
      };
      
      try {
        // Store in localStorage first
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('✅ Login successful, user data stored');
        
        // Then update state
        setUser(userData);
        return true;
      } catch (error) {
        console.error('❌ Error storing user data:', error);
        return false;
      }
    }
    
    console.log('❌ Login failed: Invalid credentials');
    return false;
  };

  const logout = () => {
    console.log('🚪 Logging out user');
    try {
      // Clear localStorage first
      localStorage.removeItem('user');
      // Then update state
      setUser(null);
      console.log('✅ Logout successful');
    } catch (error) {
      console.error('❌ Error during logout:', error);
    }
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user?.isAuthenticated
  };
}; 