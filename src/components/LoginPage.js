import { SignInOut } from "./SignInWithGoogle"
import "./LoginPage.css"
const LoginPage = ({ isMobile }) => {
    /*To do 
        1. style it!
       */
    return (
        <div className="loginPage">
            <div className="navbar">
                <img src="bannerlogo.jpg" alt="help-me-heal-logo" />
                <h1>Help Me Heal</h1>
            </div>
            <div className="contentPage">
                <div><h1>Help <br></br>patient heal<br></br>keep contact.</h1>
                    <SignInOut className="signIn-btn" isMobile={isMobile} />
                </div>
                <img className="demoImg" src="Demo.png" alt="app-demo-image" />
            </div>

        </div>
    )
}

export default LoginPage