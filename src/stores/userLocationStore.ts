import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { GeoLocation } from '@/types/geolocation';

interface UserLocationState {
  hasRehydrated: boolean;
  location: GeoLocation | null;
  error: string | null;
  setLocation: (location: GeoLocation) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useUserLocationStore = create<UserLocationState>()(
  persist(
    immer((set) => ({
      hasRehydrated: false,
      location: null,
      error: null,
      setLocation: (location) => {
        if (
          typeof location.latitude === 'number' &&
          typeof location.longitude === 'number'
        ) {
          set((state) => {
            state.location = location;
          });
        } else {
          set((state) => {
            state.error = 'Invalid location format.';
          });
        }
      },
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
      reset: () =>
        set((state) => {
          state.location = null;
          state.error = null;
        }),
    })),
    {
      name: 'user-location-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        location: state.location,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          setTimeout(() => {
            state.hasRehydrated = true;
          });
        }
      },
    }
  )
);
