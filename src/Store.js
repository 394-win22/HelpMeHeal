import create from 'zustand';
//use zustand to save state
//use to change pages
const useStore = create(set => ({
    UserPage: "home",
    setUserPage: (newPage) => set({ UserPage: newPage }),

    // userType: "docter",
    // setUserType: (newType) => set({ userType: newType }),

    DoctorPage: "DoctorHome",
    setDoctorPage: (newPage) => set({ DoctorPage: newPage }),

}));

export default useStore;