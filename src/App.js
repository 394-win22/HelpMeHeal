import SurveyPage from './components/surveypage';
import MailTo from './components/emailWidget';
import ProgressIndicator from './components/ProgressBar';
import './App.css';
import useStore from './Store';
import logo from './logo.png' 

function App() {
  const setPage = useStore(state => state.setPage);
  const page = useStore(state => state.page);

  function getPage() {
    switch (page) {
      case "home":
        return (
          
        <div>
          <ProgressIndicator />

          <MailTo />
          <button onClick = {() => {
                setPage("survey");
          }}
          id="available-btn"
                    style={{
                        fontWeight: page === "available" ? "bold" : "normal",
                        backgroundColor: page === "available" ? "#364059" : "#586994"
                        }}>
                    survey
            </button>
          home
        </div>)

      case "survey":
        return <SurveyPage />;
      default:
        return <p>Sorry, there's been an error.</p>
    }
  }

  return (
    <div className="App">
      <div className="app-header">
        <img className = "logo" src="bannerlogo.jpg"/>
        <h1>Help Me Heal</h1>
      </div>

      <div>
        {getPage()}
      </div>
    </div>
  );
}

export default App;
