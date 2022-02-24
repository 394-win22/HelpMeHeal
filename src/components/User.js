import SurveyPage from './surveypage';
import useStore from '../Store';
import { useData } from '../utilities/firebase';
import React, { useEffect } from 'react';
import { Loading } from "./Loading";
import { Error404 } from "./404";
import HomePage from './HomePage';
import PlayVideo from './PlayVideo';
import NavBar from './NavBar';
import calculatePhase from '../utilities/calculatePhase';
function User({ name, surgeryType, currentDay, user, googleUser, isMobile, setCurrentDay }) {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);
    const [data, loadingData, errorData] = useData("/");

    // firebase data initialize
    useEffect(() => {
        if (data === undefined) return;

    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    function getPage() {
        switch (page) {
            case "home":
                return <HomePage data={data}
                    currentDay={currentDay}
                    surgeryType={surgeryType}
                    name={name}
                    setPage={setPage}
                    activeIndex={calculatePhase(currentDay, data["surgery"][surgeryType]["phaseEndDay"])}
                    user={user}
                    isMobile={isMobile}
                    setCurrentDay={setCurrentDay}
                />;
            case "survey":
                return <SurveyPage currentDay={currentDay} user={user} googleUser={googleUser} data={data} />;
            case "playVideo":
                return <PlayVideo currentDay={currentDay} data={data["surgery"][surgeryType]} />;

            default:
                return <p>Sorry, there's been an error.</p>
        }
    }



    return (
        <div>
            <div>
                {getPage()}
            </div>
            <NavBar data={data}
                // showEmailForm={showEmailForm} 
                // setShowEmailForm={setShowEmailForm} 
                // handleShowEmailFormClose={handleShowEmailFormClose} 
                setPage={setPage}
                user={user} />
        </div>
    );
}

export default User;