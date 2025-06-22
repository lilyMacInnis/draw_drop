import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      error: null,
      isSigningUp: false,
      isLoggingIn: false,
      isCheckingAuth: false,
      isUpdatingProfile: false,

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check");

          set({ authUser: res.data });

        } catch (error) {
          console.log("Error in checkAuth in authStore: ", error.response.data.message);
          // user not authenticated
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        set({ isSigningUp: true });

        try {
          const response = await axiosInstance.post("/auth/signup", data);

          set({ authUser: response.data });

        } catch (error) {
          console.log("Error in signup in authStore: ", error.response.data.message);
          set({
            error: error.response?.data?.message || "Error signing up",
          });
          throw error;
        } finally {
          set({ isSigningUp: false });
        }
      },

      login: async (data) => {
        set({isLoggingIn: true});

        try{
          const response = await axiosInstance.post("/auth/login", data);
          set({authUser: response.data});
        } catch (error){
          console.log("Error in login in authStore: ", error.response.data.message);
        } finally{
          set({isLoggingIn: false});
        }
      },

      logout: async () => {
        try{
          await axiosInstance.post("/auth/logout");
          set({authUser: null});
        } catch (error){
          console.log("Error in logout in authStore: ", error.response.data.message);
        }
      },

      updateProfilePic: async (data) => {
        set({isUpdatingProfile: true});

        try{
          const res = await axiosInstance.put('/auth/update-profile-pic', data);
          set({authUser: res.data});
        } catch (error){
          console.log("Error in update profile pic in authStore: ", error);
        } finally{
          set({isUpdatingProfile: false});
        }
      },

      updateUserName: async (data) => {
        set({isUpdatingProfile: true});

        try{
          const res = await axiosInstance.put('/auth/update-user-name', data);
          set({authUser: res.data});
        } catch (error) {
          console.log("Error in update username in authStore: ", error);
        } finally{
          set({isUpdatingProfile: false});
        }
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({
        authUser: state.authUser,
      }),
    }
  )
);