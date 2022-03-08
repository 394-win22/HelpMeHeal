import LoginPage from './components/LoginPage';
import { useGoogleUserState } from './utilities/firebase';
import GetUser from './components/GetUser';
import { useEffect, useState } from 'react';

function App() {
  const [googleUser] = useGoogleUserState();
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("DOMContentLoaded", handleResize);
    window.addEventListener("resize", handleResize);

  })

  return (
    <div className="App">

      <div>
        {googleUser ?
          <div>
            <div className={isMobile ? "app-header mobile" : "app-header"} style={{ marginBottom: isMobile ? "1rem" : "3rem", height: isMobile ? "6rem" : "10rem" }}>
              <img className="logo" src="bannerlogo.jpg" alt="help-me-heal-logo" style={{ height: isMobile ? "4rem" : "8rem" }} />
              <h1>Help Me Heal</h1>
            </div>
            <GetUser googleUser={googleUser} isMobile={isMobile} />
          </div>
          :
          <LoginPage isMobile={isMobile} />
        }
        {/*<Loading isMobile={isMobile}/>*/}
      </div>
    </div>
  );
}

export default App;
