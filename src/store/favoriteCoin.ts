import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface FavoriteStore {
    list: string[];
    toggle: (coin: string) => void;
}
export const useFavorites = create<FavoriteStore>()(
    persist(
        (set) => ({
            list: [],
            toggle: (item: string) => set((s: { list: string[]; }) => ({
                list: s.list.some((favorite: string) => favorite === item)
                    ? s.list.filter((favorite: string) => favorite !== item)
                    : [...s.list, item]
            }))
        }),
        { name: 'favoritos' }
    )
)