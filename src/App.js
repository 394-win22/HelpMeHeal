import User from './components/User';
import './App.css';
import useStore from './Store';

function App() {
  const userType = useStore(state => state.userType);
  function getUserType() {
    switch (userType) {
      case "user":
        return <User />
      case "doctor":
        return <></>
      default:
        return <p>Sorry, there's been an error.</p>
    }
  }

  return (
    <div className="App">

      <div className="app-header">
        <img className="logo" src="bannerlogo.jpg" />
        <h1>Help Me Heal</h1>
      </div>

      <div>
        {getUserType()}
      </div>
    </div>
  );
}

export default App;
