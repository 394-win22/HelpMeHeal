import create from 'zustand';

const useStore = create(set => ({
    UserPage: "home",
    setUserPage: (newPage) => set({ UserPage: newPage }),

    userType: "docter",
    setUserType: (newType) => set({ userType: newType })
}));

export default useStore;