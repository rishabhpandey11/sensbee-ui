import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { LoginCredentials, UserRegistration } from "../types/auth.types";
import api from "../axios"; // Axios instance

interface AuthState {
  session: string | null;
  authenticated: boolean;
  isHydrated: boolean; // ✅ New state to track when Zustand is ready
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  signup: (userData: UserRegistration) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const authStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      session: null,
      user: null,
      authenticated: false,
      isHydrated: false, // ✅ Set false initially

      // User Login
      login: async (credentials) => {
        try {
          const response = await api.post("/auth/login", credentials);
          const token = response.data.jwt;
          localStorage.setItem("auth_token", token);
          set({ session: token, authenticated: true });
          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.response?.data?.message || "Login error" };
        }
      },

      // User Signup
      signup: async (userData) => {
        try {
          await api.post("/api/users/register", userData);
          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.response?.data?.message || "Signup error" };
        }
      },

      // Logout
      logout: async () => {
        localStorage.removeItem("auth_token");
        set({ session: null, authenticated: false });
        window.location.href = "/login"; // Redirect after logout
      },
    })),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.set({ isHydrated: true }); // ✅ Mark Zustand as fully loaded
      },
    }
  )
);

export default authStore;
