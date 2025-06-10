import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const authStore = create((set) => ({
    authUser: null,
    error: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({isCheckingAuth: true});
        try{
            const res = await axiosInstance.get("/auth/check");

            set({authUser: res.data});
        } catch (error){
            console.log("Error in checkAuth in authStore: ", error);
            // user not authenticated
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) => {
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post("/auth/signup", data);

            set({authUser: res.data});
        } catch (error){
            console.log("Error in signup in authStore: ", error.message);
            set({error: error.response.data.message || "Error signing up"})
            throw error;
        } finally {
            set({isSigningUp: false});
        }
    }
}))