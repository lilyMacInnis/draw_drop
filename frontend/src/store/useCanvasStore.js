import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCanvasStore = create(
    persist(
        (set, get) => ({
            brushColor: '#000000',
            brushSize: 5,
            imageUrl: '',

            setBrushColor: (brushColor) => set({brushColor}),
            setBrushSize: (brushSize) => set({brushSize}),
            setImageUrl: (imageUrl) => set({imageUrl}),

        })
    )
);