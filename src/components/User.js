import SurveyPage from './surveypage';
import MailTo from './emailWidget';
import ProgressIndicator from './ProgressBar';
import './User.css';
import useStore from '../Store';

function User() {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);

    function getPage() {
        switch (page) {
            case "home":
                return (

                    <div>
                        <ProgressIndicator />

                        <MailTo />
                        <button onClick={() => {
                            setPage("survey");
                        }}

                            style={{
                                fontWeight: "normal",
                                backgroundColor: "#586994"
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
                <img className="logo" src="bannerlogo.jpg" />
                <h1>Help Me Heal</h1>
            </div>

            <div>
                {getPage()}
            </div>
        </div>
    );
}

export default User;