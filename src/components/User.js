import SurveyPage from './surveypage';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import useStore from '../Store';
import { useUserState, useData } from '../utilities/firebase';
import React, { useEffect, useState } from 'react';
import { Loading } from "./Loading";
import { Error404 } from "./404";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';

function User() {
    const setPage = useStore(state => state.setUserPage);
    const page = useStore(state => state.UserPage);
    const user = useUserState()[0];
    const [data, loadingData, errorData] = useData("/");
    const [activeIndex, setActiveIndex] = useState(2);

    // firebase data initialize
    useEffect(() => {
        // console.log(data)
        if (data === undefined) return;
    }, [data]);

    if (errorData) return <Error404 />;
    if (loadingData) return <Loading />;

    function getPage() {
        switch (page) {
            case "home":
                return (
                    <div>
                        {/* the zero bellow has to change userid as its real id later */}
                        <Welcome user={user} firebaseData={data} activeIndex={activeIndex} startdate={data["user"][0]["startDate"]} />
                        <ProgressIndicator setActiveIndex={setActiveIndex} startdate={data["user"][0]["startDate"]} phaseEndDay={data["surgery"]["acl"]["phaseEndDay"]} />
                        <Box>
                            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 3 }}>
                                <Button onClick={() => window.location = 'mailto:helpmeheal.project@gmail.com'}>
                                    <EmailIcon style={{ color: 'white', fontSize: '2.7rem' }} />
                                </Button>
                                <Button onClick={() => {
                                    setPage("survey");
                                }}

                                    style={{
                                        fontWeight: "normal",
                                        color: 'white',
                                        fontSize: '1.5rem',
                                        marginLeft: "5rem",
                                    }}>
                                    survey
                                </Button>
                            </AppBar>
                        </Box>

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