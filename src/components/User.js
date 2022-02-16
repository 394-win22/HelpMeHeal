import SurveyPage from './surveypage';
import useStore from '../Store';
import { useUserState, useData } from '../utilities/firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from "./Loading";
import { Error404 } from "./404";
import HomePage from './HomePage';

function User() {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);
    const user = useUserState()[0];
    const [data, loadingData, errorData] = useData("/");
    const [activeIndex, setActiveIndex] = useState(2);
    const [name, setName] = useState("");
    const [type, setType] = useState("");


    const initUser = (user) => {
        setName(user.name);
        setType(user.surgeryType);
    }

    const defaultUser = () => {
        setName("Edward");
        setType("acl");
    }

    // firebase data initialize
    useEffect(() => {
        if (data === undefined) return;
        Object.entries(data.user).map((entry) => {
            entry[1].email === user.email ? initUser(entry[1]) : defaultUser();
        })
    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    function getPage() {
        switch (page) {
            case "home":
                return <HomePage data={data} name={name} type={type} setPage={setPage} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />;

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