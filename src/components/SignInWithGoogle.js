import { signInWithGoogle, signOut, useGoogleUserState } from '../utilities/firebase.js';
import Button from "@mui/material/Button";
import useStore from '../Store.js';

const buttonStyle = (isMobile) => ({
    mx: 2,
    fontSize: isMobile ? '0.6rem' : "0.8rem",
    width: isMobile ? '3rem' : '6rem',
    margin: '1%',
    bgcolor: "#b43434",
    borderRadius: 2,
    color: "rgb(255, 255, 255)",
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
})

export const SignInOut = ({ isMobile }) => {
    const setPage = useStore(state => state.setDoctorPage);
    const [user] = useGoogleUserState();
    const SignInButton = () => (
        <Button data-cy="cySignInButton" sx={() => buttonStyle(isMobile)} onClick={() => {
            signInWithGoogle()
        }
        }> Sign In </Button>
    );

    const SignOutButton = () => (
        <Button data-cy="cySignOutButton" sx={() => buttonStyle(isMobile)} onClick={() => {
            setPage("DoctorHome");
            signOut();
        }
        }> Sign Out </Button>
    );
    return (
        <div className="signInAndOut" >
            {user ? <SignOutButton /> : <SignInButton />}
        </div>);
};
