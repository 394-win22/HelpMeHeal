import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import ProgressIndicator from './ProgressBar';
import Welcome from './Welcome';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MailTo from './emailWidget';
import { SwitchDay } from './SwitchDay'
import NavBar from './NavBar';

const IconStyle = {
    color: 'white',
    fontSize: '2.7rem',
    borderRadius: 2,
    '&:hover': {
        bgcolor: "#b36464"
    },
    '&:focus': {
        bgcolor: "#b36464"
    },
}

const HomePage = ({ data, currentDay, surgeryType, name, type, setPage, activeIndex, setActiveIndex, user, isMobile, setCurrentDay }) => {
    console.log(user)
    const doctorEmail = data["user"][user.doctorId]["email"];
    return (
        <div>
            <ProgressIndicator setActiveIndex={setActiveIndex} 
                currentDay={currentDay} 
                phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} 
                isMobile={isMobile} />
            <SwitchDay currentDay={currentDay} 
                setCurrentDay={setCurrentDay} 
                isMobile={isMobile} 
                phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]}/>
            <Welcome username={name} 
                surgeryType={surgeryType} 
                firebaseData={data} 
                activeIndex={activeIndex} 
                currentDay={currentDay} 
                daysDict={data["surgery"][surgeryType]["days"]}
                phaseEndDay={data["surgery"][surgeryType]["phaseEndDay"]} />
            <NavBar data={data} 
                    // showEmailForm={showEmailForm} 
                    // setShowEmailForm={setShowEmailForm} 
                    // handleShowEmailFormClose={handleShowEmailFormClose} 
                    setPage={setPage}
                    user={user}/>

        </div>
    )

}

export default HomePage;