"use client";

import {useCallback} from 'react';
import {useAuthStore} from '../stores/auth-store';

export const MOCK_AUTH_TOKEN = 'mock-token';

export const mockUserProfile = {
  displayName: 'Chrono Tester',
  rating: 1480,
  totalSolved: 24,
  streak: 3
};

export const useMockAuth = () => {
  const setSession = useAuthStore((state) => state.setSession);
  const clear = useAuthStore((state) => state.clear);

  const login = useCallback(() => {
    setSession(MOCK_AUTH_TOKEN, mockUserProfile);
  }, [setSession]);

  return {
    login,
    clear
  };
};