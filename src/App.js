import LoginPage from './components/LoginPage';
import { useGoogleUserState } from './utilities/firebase';
import GetUser from './components/GetUser';
import { SignInOut } from "./components/SignInWithGoogle"
function App() {
  const [googleUser] = useGoogleUserState();

  return (
    <div className="App">

      <div className="app-header">
        <img className="logo" src="bannerlogo.jpg" />
        <h1>Help Me Heal</h1>
      </div>

      <div>
        {googleUser ?
          <div>
            <GetUser googleUser={googleUser} />
          </div>
          :
          <LoginPage />
        }
      </div>
    </div>
  );
}

export default App;
