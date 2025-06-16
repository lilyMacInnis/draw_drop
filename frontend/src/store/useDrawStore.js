import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";

export const useDrawStore = create(
    persist(
        (set) => ({
            users: [],
            isLoadingUsers: false,
            drawingsFromUser: [],
            drawingsToUser: [],
            isLoadingDrawings: false,
            selectedUser: null,

            setSelectedUser: (selectedUser) => set({selectedUser}),

            getUsers: async () => {
                set({isLoadingUsers: true});
                try{
                    const res = await axiosInstance.get("/draw/users");
                    set({users: res.data});
                } catch (error){
                    console.log("Error in getUsers in drawStore: ", error.response.data.message);
                } finally{
                    set({isLoadingUsers: false});
                }
            },

            getDrawingsFromUser: async () => {
                set({isLoadingDrawings: true});
                try{
                    const res = await axiosInstance.get("/draw/sent");
                    set({drawingsFromUser: res.data});
                } catch (error){
                    console.log("Error in getDrawingsFromUser in drawStore: ", error.response.data.message);
                } finally{
                    set({isLoadingDrawings: false});
                }
            },

            getDrawingsToUser: async () => {
                set({isLoadingDrawings: true});
                try{
                    const res = await axiosInstance.get("/draw/inbox");
                    set({drawingsToUser: res.data});
                } catch (error){
                    console.log("Error in getDrawingsToer in drawStore: ", error.response.data.message);
                } finally{
                    set({isLoadingDrawings: false});
                }
            }
        })
    )
);