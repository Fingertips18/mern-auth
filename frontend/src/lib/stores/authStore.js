import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,
        authorized: false,
        setUser: (user) => set({ user: user }),
        setAuthorized: (authorized) => set({ authorized: authorized }),
      }),
      {
        name: 'mern-auth',
        partialize: (state) => ({
          user: state.user,
          authorized: state.authorized,
        }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export { useAuthStore };
