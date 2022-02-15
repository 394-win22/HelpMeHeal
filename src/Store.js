import create from 'zustand';

const useStore = create(set => ({
    UserPage: "home",
    setUserPage: (newPage) => set({ UserPage: newPage }),

    userType: "user",
    setUserType: (newType) => set({ userType: newType })
}));

export default useStore;