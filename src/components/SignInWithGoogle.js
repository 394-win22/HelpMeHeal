import { signInWithGoogle, signOut, useGoogleUserState, setData } from '../utilities/firebase.js';
import Button from "@mui/material/Button";
const buttonStyle = {
    mx: 2,
    width: 1 / 14,
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
}

export const SignInOut = () => {
    const [user] = useGoogleUserState();
    const SignInButton = () => (
        <Button sx={buttonStyle} onClick={() => {
            signInWithGoogle()
        }
        }> Sign In </Button>
    );

    const SignOutButton = () => (
        <Button sx={buttonStyle} onClick={() => signOut()}> Sign Out </Button>
    );
    return (
        <div className="signInAndOut">
            {user ? <SignOutButton /> : <SignInButton />}
        </div>);
};
