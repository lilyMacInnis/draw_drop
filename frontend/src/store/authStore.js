import {create} from "zustand";
import { checkAuth } from "../../../backend/src/controllers/auth.controllers";

export const authStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
}))