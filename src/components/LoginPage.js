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
                        <span style={{
                            whiteSpace: "nowrap",
                            marginLeft: "1rem",
                            marginTop: "0.3rem",
                            paddingRight: "30%",
                            color: "rgb(142,149,160)"
                        }}><b>Help Me Heal</b></span>
                    </div>
                    <SignInOut isMobile={isMobile} />
                </div>
            </div>

            <Divider style={{ width: "80%", margin: "0 auto", paddingLeft: "50px", paddingRight: "50px" }} />

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
                            <h1> Help <br />patient heal <br /> keep contact.</h1>
                            <div className="subtext">
                                This is an app that help patient keep contact with his or hers doctors.
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