import logo from './logo.svg';
import './App.css';
import SurveyPage from './components/surveypage';
import MailTo from './components/emailWidget';

function App() {
  return (
    <div className="App">
      <div className='app-header'>
        <img src='https://s2.loli.net/2022/02/15/jvkdyu3NJMc65qT.png'/>
        <h1>Help Me Heal</h1>
      </div>
      <MailTo />

      <SurveyPage />
    </div>
  );
}

export default App;
