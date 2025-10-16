import {create} from 'zustand';

export interface AuthState {
  token: string | null;
  user: unknown | null;
  setSession: (token: string, user: unknown) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: (token: string, user: unknown) => set({token, user}),
  clear: () => set({token: null, user: null})
}));
