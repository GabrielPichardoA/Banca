'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, UserBalance, CryptoBalance } from '@/types';
import { saveUser, getUser, removeUser, saveBalance, getBalance } from '@/lib/storage';

interface AuthContextType {
  user: User | null;
  balance: UserBalance | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateBalance: (amount: number, crypto: string) => void;
  refreshBalance: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [balance, setBalance] = useState<UserBalance | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage or create default user
  useEffect(() => {
    const savedUser = getUser();
    if (savedUser) {
      setUser(savedUser);
      const savedBalance = getBalance(savedUser.id);
      if (savedBalance) {
        setBalance(savedBalance);
      }
    } else {
      // Create default user for demo purposes
      const defaultUser: User = {
        id: 'demo_user_1',
        email: 'demo@lottery.crypto',
        name: 'Demo Player',
        createdAt: Date.now(),
        lastLogin: Date.now(),
        isLoggedIn: true
      };

      const defaultBalance: UserBalance = {
        userId: defaultUser.id,
        balances: [
          { crypto: 'USDT', amount: 500, usdValue: 500 },
          { crypto: 'USDC', amount: 300, usdValue: 300 }
        ],
        totalUsdValue: 800,
        lastUpdated: Date.now()
      };

      setUser(defaultUser);
      setBalance(defaultBalance);
      saveUser(defaultUser);
      saveBalance(defaultBalance);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock: Check if user exists (in real app, would query backend)
      const users = JSON.parse(localStorage.getItem('lottery_users') || '[]');
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        createdAt: foundUser.createdAt,
        lastLogin: Date.now(),
        isLoggedIn: true
      };

      setUser(userData);
      saveUser(userData);

      // Load balance
      const userBalance = getBalance(userData.id);
      if (userBalance) {
        setBalance(userBalance);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock: Create new user
      const users = JSON.parse(localStorage.getItem('lottery_users') || '[]');

      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email already registered');
      }

      const newUser = {
        id: `user_${Date.now()}`,
        email,
        password, // NEVER do this in production!
        name,
        createdAt: Date.now()
      };

      users.push(newUser);
      localStorage.setItem('lottery_users', JSON.stringify(users));

      // Create user object and balance
      const userData: User = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
        lastLogin: Date.now(),
        isLoggedIn: true
      };

      const initialBalance: UserBalance = {
        userId: newUser.id,
        balances: [
          { crypto: 'USDT', amount: 500, usdValue: 500 },
          { crypto: 'USDC', amount: 300, usdValue: 300 }
        ],
        totalUsdValue: 800,
        lastUpdated: Date.now()
      };

      setUser(userData);
      setBalance(initialBalance);
      saveUser(userData);
      saveBalance(initialBalance);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setBalance(null);
    removeUser();
  }, []);

  const updateBalance = useCallback(
    (amount: number, crypto: string) => {
      if (!balance || !user) return;

      const newBalances = balance.balances.map(b => {
        if (b.crypto === crypto) {
          return {
            ...b,
            amount: b.amount - amount
          };
        }
        return b;
      });

      const newBalance: UserBalance = {
        ...balance,
        balances: newBalances,
        totalUsdValue: newBalances.reduce((sum, b) => sum + b.usdValue, 0),
        lastUpdated: Date.now()
      };

      setBalance(newBalance);
      saveBalance(newBalance);
    },
    [balance, user]
  );

  const refreshBalance = useCallback(() => {
    if (user) {
      const savedBalance = getBalance(user.id);
      if (savedBalance) {
        setBalance(savedBalance);
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        balance,
        isLoading,
        login,
        register,
        logout,
        updateBalance,
        refreshBalance
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
