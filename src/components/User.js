import SurveyPage from './surveypage';
import useStore from '../Store';
import { useData } from '../utilities/firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from "./Loading";
import { Error404 } from "./404";
import HomePage from './HomePage';
import PlayVideo from './PlayVideo';
import NavBar from './NavBar';
import calculatePhase from '../utilities/calculatePhase';
function User({ name, surgeryType, currentDay, user, googleUser, isMobile, setCurrentDay, isFirstLogin }) {
    const setPage = useStore(state => state.setUserPage);
    const [zoom, setZoom] = useState(false);
    const page = useStore(state => state.UserPage);
    const [data, loadingData, errorData] = useData("/");
    const [activeIndex, setActiveIndex] = useState();

    // firebase data initialize
    useEffect(() => {
        if (data === undefined) return;
        setActiveIndex(calculatePhase(currentDay, data["surgery"][surgeryType]["phaseEndDay"]));
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
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    user={user}
                    isMobile={isMobile}
                    setCurrentDay={setCurrentDay}
                    setZoom={setZoom}
                    isFirstLogin={isFirstLogin}
                    zoom={zoom}
                    googleUser={googleUser}
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
                user={user}
                setZoom={setZoom} />
        </div>
    );
}

export default User;