import LoginPage from './components/LoginPage';
import { useGoogleUserState, useUserState } from './utilities/firebase';
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
    window.addEventListener("resize", handleResize);
  })

  return (
    <div className="App">

      <div className={isMobile ? "app-header mobile" : "app-header"}>
        <img className="logo" src="bannerlogo.jpg" />
        <h1>Help Me Heal</h1>
      </div>

      <div>
        {googleUser ?
          <div>
            <GetUser googleUser={googleUser} isMobile={isMobile}/>
          </div>
          :
          <LoginPage isMobile={isMobile}/>
        }
      </div>
    </div>
  );
}

export default App;
