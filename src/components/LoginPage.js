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
                    <div className="logoContent">
                        <img src="bannerlogo.jpg" alt="help-me-heal-logo" style={{ borderRadius: "0.2rem", height: "2rem" }} />
                        <span><b>Help Me Heal</b></span>
                    </div>
                    <SignInOut isMobile={isMobile} />
                </div>
            </div>

            <Divider style={{ width: "80%", margin: "0 auto", paddingLeft: isMobile ? "0px" : "50px", paddingRight: isMobile ? "0px" : "50px" }} />

            {/* <Grow in={true} {...({ timeout: 1000 })}>
                <div className="mainTitle">
                    <img src="bannerlogo.jpg" alt="help-me-heal-logo" style={{borderRadius:"0.5rem", height:"50%", marginTop:"2.8%"}}/>
                    <h2>Help Me Heal</h2>
                </div>
            </Grow> */}
            <div className="container">
                <div className="contentPage">
                    <Grow in={true} {...({ timeout: 1500 })}>
                        <div className="content1" >
                            <h1> Help <br />patients heal. <br /> Stay in touch.</h1>
                            <div className="subtext">
                                This is an app that helps patients keep contact with their doctor.
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