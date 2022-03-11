import { SignInOut } from "./SignInWithGoogle"
import "./LoginPage.css"
import Divider from '@mui/material/Divider';
import Grow from '@mui/material/Grow';

const LoginPage = ({ isMobile }) => {
    /*To do
        1. style it!
       */
    return (
        <div className="loginPage">
            <div className="navbar">
                <div className="container navbarContent">
                    <div className="logoContent" data-cy="cyLogoContent">
                        <img src="bannerlogo.jpg" alt="help-me-heal-logo" style={{ borderRadius: "0.2rem", height: "2rem" }} />
                        <span ><b>Help Me Heal</b></span>
                    </div>
                    <div style={{marginLeft: isMobile ? "35%" : "70%"}}>
                        <SignInOut isMobile={isMobile} />
                    </div>
                </div>
            </div>

            <Divider style={{ width: "80%", margin: "0 auto", paddingLeft: isMobile ? "0px" : "50px", paddingRight: isMobile ? "0px" : "50px" }} />

            <div className="container">
                <div className="contentPage">
                    <Grow in={true} {...({ timeout: 1500 })}>
                        <div className="content1" >
                            <h1> Get back to the activities you love.</h1>
                            <div className="subtext">
                                Day-by-day recovery tips to keep your rehab on track and connected to your healthcare provider.
                            </div>
                        </div>
                    </Grow>

                    <Grow in={true} {...({ timeout: 2000 })}>
                        <div className="demo-img">
                            <img src="Demo.png" alt="app-demo" />
                        </div>
                    </Grow>
                </div>
            </div>
        </div>
    )
}

export default LoginPage