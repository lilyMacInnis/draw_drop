import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { persist } from "zustand/middleware";

export const useDrawStore = create(
    persist(
        (set, get) => ({
            users: [],
            isLoadingUsers: false,
            drawingsFromUser: [],
            drawingsToUser: [],
            isLoadingDrawings: false,
            isSendingDrawing: false,
            selectedUser: null,
            isDeleting: false,

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

            sendDrawing: async(drawingData) => {
                const {selectedUser} = get();
                set({isSendingDrawing: true});
                try{
                    await axiosInstance.post(`/draw/send/${selectedUser._id}`, drawingData);
                } catch (error){
                    console.log("Error in sendDrawing in drawStore: ", error.response.data.message);
                } finally{
                    set({selectedUser: null});
                    set({isSendingDrawing: false});
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
            },

            deleteDrawing: async (drawingId) => {
                set({isDeleting: true});
                try{
                    await axiosInstance.delete(`/draw/delete/${drawingId}`);
                } catch (error){
                    console.log("Error in deleteDrawing in drawStore: ", error.response.data.message);
                } finally {
                    set({isDeleting: false});
                }
            }
        }),
        {
            name: "draw-storage", // key in localStorage
            partialize: (state) => ({
                selectedUser: state.selectedUser,
            }),
        }
    )
);