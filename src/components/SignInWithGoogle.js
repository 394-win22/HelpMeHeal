import { signInWithGoogle, signOut, useGoogleUserState } from '../utilities/firebase.js';
import Button from "@mui/material/Button";
const buttonStyle = (isMobile) => ({
    mx: 2,
    width: isMobile ? '20vw' : '6rem',
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
    const [user] = useGoogleUserState();
    const SignInButton = () => (
        <Button sx={() => buttonStyle(isMobile)} onClick={() => {
            signInWithGoogle()
        }
        }> Sign In </Button>
    );

    const SignOutButton = () => (
        <Button sx={() => buttonStyle(isMobile)} onClick={() => signOut()}> Sign Out </Button>
    );
    return (
        <div className="signInAndOut">
            {user ? <SignOutButton /> : <SignInButton />}
        </div>);
};
