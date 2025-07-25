import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { IUser } from '@/types/user';

interface AuthState {
  // Authentication state
  isAuthenticated: boolean;
  token: string | null;
  user: IUser | null;
  isHydrated: boolean;

  // Actions
  setToken: (token: string) => void;
  setUser: (user: IUser) => void;

  // Authentication actions
  login: (token: string, user: IUser) => void;
  logout: () => void;
  updateUser: (user: Partial<IUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      isHydrated: false,
      token: null,
      user: null,
      isLoading: false,
      isLoggingIn: false,
      isLoggingOut: false,

      // Basic setters
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),

      // Authentication actions
      login: (token, user) => {
        set({
          isAuthenticated: true,
          token,
          user,
        });
      },

      logout: () => {
        set({
          isAuthenticated: false,
          token: null,
          user: null,
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              ...userData,
            },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      // Only persist essential auth data
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true; // Mark as hydrated after rehydration
        }
      },
    }
  )
);
