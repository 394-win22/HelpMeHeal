import SurveyPage from './surveypage';
import useStore from '../Store';
import { useData } from '../utilities/firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from "../utilities/Loading";
import { Error404 } from "../utilities/404";
import HomePage from './HomePage';
import PlayVideo from './PlayVideo';
import NavBar from './NavBar';
import calculatePhase from '../utilities/calculatePhase';

function User({ name, surgeryType, currentDay, user, googleUser, isMobile, setCurrentDay, isFirstLogin }) {

    const setPage = useStore(state => state.setUserPage);
    const [zoom, setZoom] = useState(false);
    const page = useStore(state => state.UserPage);
    const [data, loadingData, errorData] = useData("/");
    const [videoCheck, setVideoCheck] = useState(false);

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
                    phase={calculatePhase(currentDay, data["surgery"][surgeryType]["phaseEndDay"])}
                    user={user}
                    isMobile={isMobile}
                    setCurrentDay={setCurrentDay}
                    setZoom={setZoom}
                    zoom={zoom}
                    surveyCheck={data["user"][googleUser.uid]["surveyResults"] ? data["user"][googleUser.uid]["surveyResults"][currentDay - 1] !== undefined : false}
                    videoCheck={videoCheck}
                    googleUser={googleUser}

                />;
            case "survey":
                return <SurveyPage currentDay={currentDay} user={user} googleUser={googleUser} data={data} />;
            case "playVideo":
                return <PlayVideo currentDay={currentDay} phase={calculatePhase(currentDay, data["surgery"][surgeryType]["phaseEndDay"])} data={data["surgery"][surgeryType]} setVideoCheck={setVideoCheck} />;
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
                currentDay={currentDay}
                googleUser={googleUser}
                setPage={setPage}
                user={user}
                setZoom={setZoom}
                surveyCheck={data["user"][googleUser.uid]["surveyResults"] ? data["user"][googleUser.uid]["surveyResults"][currentDay - 1] !== undefined : false}
            />
        </div>
    );
}

export default User;