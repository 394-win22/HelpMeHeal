import SurveyPage from './surveypage';
import useStore from '../Store';
import { useData } from '../utilities/firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from "./Loading";
import { Error404 } from "./404";
import HomePage from './HomePage';

function User({ name, surgeryType, currentDay }) {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);

    const [data, loadingData, errorData] = useData("/");
    
    const [activeIndex, setActiveIndex] = useState(2);

    // firebase data initialize
    useEffect(() => {
        if (data === undefined) return;
        
    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    function getPage() {
        switch (page) {
            case "home":
                return <HomePage data={data} currentDay={currentDay} surgeryType={surgeryType} name={name} setPage={setPage} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />;
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