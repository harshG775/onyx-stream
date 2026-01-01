import { create } from "zustand"

type State = {
    isSearchBarOpen: boolean
}
type Action = {
    setSearchBarState: (value: boolean) => void
}
export const useTopSearchBar = create<State & Action>((set) => ({
    isSearchBarOpen: false,
    setSearchBarState: (isSearchBarOpen) => set({ isSearchBarOpen }),
}))
