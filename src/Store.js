import create from 'zustand';

const useStore = create(set => ({
    page: "home",
    setPage: (newPage) => set({ page: newPage })
}));

export default useStore;