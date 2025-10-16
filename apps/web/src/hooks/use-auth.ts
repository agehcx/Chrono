"use client";

import {useMutation, useQuery} from '@tanstack/react-query';
import {apiClient} from '../lib/api-client';
import {type AuthState, useAuthStore} from '../stores/auth-store';
import {MOCK_AUTH_TOKEN, mockUserProfile} from './use-mock-auth';

export const useAuth = () => {
  const token = useAuthStore((state: AuthState) => state.token);
  const user = useAuthStore((state: AuthState) => state.user);
  const setSession = useAuthStore((state: AuthState) => state.setSession);
  const clear = useAuthStore((state: AuthState) => state.clear);
  const enableMockAuth = process.env.NEXT_PUBLIC_ENABLE_MOCK_AUTH === 'true';

  const isMockSession = token === MOCK_AUTH_TOKEN;

  const profile = useQuery({
    queryKey: ['me', token],
    queryFn: async () => {
      if (!token || isMockSession) {
        return isMockSession ? mockUserProfile : null;
      }
      const response = await apiClient.getMe(token);
      setSession(token, response.user);
      return response.user;
    },
    enabled: Boolean(token) && !isMockSession
  });

  const verifyWorldId = useMutation({
    mutationFn: async (payload: unknown) => {
      if (enableMockAuth) {
        return {token: MOCK_AUTH_TOKEN, user: mockUserProfile};
      }
      return apiClient.verifyWorldId(payload);
    },
    onSuccess: (data: {token: string; user: unknown}) => setSession(data.token, data.user)
  });

  return {
    token,
    user: isMockSession ? mockUserProfile : user ?? profile.data,
    verifyWorldId,
    clear
  };
};
