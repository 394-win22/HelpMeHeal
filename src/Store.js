import create from 'zustand';

const useStore = create(set => ({
    UserPage: "home",
    setUserPage: (newPage) => set({ UserPage: newPage }),

    userType: "docter",
    setUserType: (newType) => set({ userType: newType }),

    DoctorPage: "DoctorHome",
    setDoctorPage: (newPage) => set({ DoctorPage: newPage }),

}));

export default useStore;