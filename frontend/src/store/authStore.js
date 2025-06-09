import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const authStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
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

    }
}))