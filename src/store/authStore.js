import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isPro: false,
      credits: 3,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setPro: (isPro) => set({ 
        isPro,
        credits: isPro ? Infinity : 3,
        user: get().user ? {
          ...get().user,
          isPro,
          credits: isPro ? Infinity : 3
        } : null
      }),
      updateCredits: (credits) => set({ credits }),
      logout: () => set({ user: null, isAuthenticated: false, isPro: false, credits: 3 }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;