import SurveyPage from './components/surveypage';
import MailTo from './components/emailWidget';
import ProgressIndicator from './components/ProgressBar';
import './App.css';
import useStore from './Store';


function App() {
  const setPage = useStore(state => state.setPage);
  const page = useStore(state => state.page);

  function getPage() {
    switch (page) {
      case "home":
        return <div>home</div>
      case "survey":
        return <SurveyPage />;
      default:
        return <p>Sorry, there's been an error.</p>
    }
  }

  return (
    <div className="App">
      <div className="app-header">
        <img src='https://s2.loli.net/2022/02/15/jvkdyu3NJMc65qT.png'/>
        <h1>Help Me Heal</h1>
      </div>

      <ProgressIndicator />

      <MailTo />


      <div>
        {getPage()}
      </div>
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
    </div>
  );
}

export default App;
