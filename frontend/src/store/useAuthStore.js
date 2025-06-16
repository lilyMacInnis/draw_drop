import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create(
  persist(
    (set) => ({
      authUser: null,
      error: null,
      isAuthenticated: false,
      isSigningUp: false,
      isLoggingIn: false,
      isCheckingAuth: false,

      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const res = await axiosInstance.get("/auth/check");

          set({ authUser: res.data, isAuthenticated: true });

        } catch (error) {
          console.log("Error in checkAuth in authStore: ", error.response.data.message);
          // user not authenticated
          set({ authUser: null, isAuthenticated: false });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      signup: async (data) => {
        //console.log("signup function in authstore ran");
        set({ isSigningUp: true });

        try {
          const response = await axiosInstance.post("/auth/signup", data);

          set({ authUser: response.data, isAuthenticated: true });

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
    }),
    {
      name: "auth-storage", // key in localStorage
      partialize: (state) => ({
        authUser: state.authUser,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);


// import {create} from "zustand";
// import {persist} from "zustand/middleware";
// import { axiosInstance } from "../lib/axios";

// export const useAuthStore = create((set) => ({

//     authUser: null,
//     error: null,
//     isAuthenticated: false,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isCheckingAuth: false,

//     checkAuth: async () => {
//         set({isCheckingAuth: true});
//         try{
//             const res = await axiosInstance.get("/auth/check");

//             set({authUser: res.data, isAuthenticated: true});
            
//         } catch (error){
//             console.log("Error in checkAuth in authStore: ", error);
//             // user not authenticated
//             set({authUser: null});
//         } finally {
//             set({isCheckingAuth: false});
//         }
//     },

//     signup: async (data) => {
//         console.log("signup function in authstore ran");
//         set({isSigningUp: true});

//         //console.log(isSigningUp);
//         try{
//             console.log("in the try");
//             const response = await axiosInstance.post("/auth/signup", data);
//             console.log("after post");

//             set({authUser: response.data, isAuthenticated: true}, true);
//             //console.log("isauth: ", isAuthenticated);
//             console.log("after set");
//             console.log(response.data);
//             //console.log(authUser);
//         } catch (error){
//             console.log("Error in signup in authStore: ", error.message);
//             set({error: error.response.data.message || "Error signing up"})
//             throw error;
//         } finally {
//             set({isSigningUp: false});
//         }
//     }
// }))