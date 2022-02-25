import { SignInOut } from "./SignInWithGoogle"
import "./LoginPage.css"
import Divider from '@mui/material/Divider';

const LoginPage = ({ isMobile }) => {
    /*To do 
        1. style it!
       */
    return (
        <div className="loginPage">
            <div className="navbar">
                <div className="navbarContent">
                    <img src="bannerlogo.jpg" alt="help-me-heal-logo" style={{ borderRadius: "0.2rem", height: "2rem" }} />
                    <span style={{
                        marginLeft: "1rem",
                        marginTop: "0.3rem",
                        paddingRight: "30%",
                        color: "rgb(142,149,160)"
                    }}><b>Help Me Heal</b></span>
                    <SignInOut isMobile={isMobile} />
                </div>
            </div>

            <Divider style={{ width: "60%", margin: "0 auto" }} />

            <div className="mainTitle">
                <img src="bannerlogo.jpg" alt="help-me-heal-logo" style={{ height: "50%", marginTop: "2.8%" }} />
                <h2>Help Me Heal</h2>
            </div>

            <div className="content1" style={{ marginTop: "2rem", marginBottom: "10rem" }}>
                <h1> Help <br /> patient heal <br /> keep contact.</h1>
            </div>

            <div style={{ paddingBottom: "10rem" }}>
                <img src="Demo.png" alt="app-demo" style={{ width: "70%", height: "50%" }} />
            </div>

        </div>
    )
}

export default LoginPage