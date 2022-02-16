import SurveyPage from './surveypage';
import MailTo from './emailWidget';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import useStore from '../Store';
import {useUserState, useData} from '../utilities/firebase';
import React, { useEffect, useState } from 'react';
import {Loading} from "./Loading";
import {Error404} from "./404";

function User() {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);
    const user = useUserState()[0];
    const [data, loadingData, errorData] = useData("/");
    const [activeIndex, setActiveIndex] = useState(2);

    // firebase data initialize
    useEffect(() => {
        console.log(data)
        if (data === undefined) return;
    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    function getPage() {
        switch (page) {
            case "home":
                return (
                    <div>
                        <Welcome user={user} firebaseData={data} activeIndex={activeIndex}/>
                        <ProgressIndicator activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
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
        <div>
            {getPage()}
        </div>
    );
}

export default User;