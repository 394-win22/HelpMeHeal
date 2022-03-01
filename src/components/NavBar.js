import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import MailTo from './emailWidget';
import swal from 'sweetalert';

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



const NavBar = ({ data, currentDay, googleUser, setPage, user, setZoom }) => {
    const doctorEmail = data["user"][user.doctorId]["email"];
    const [showEmailForm, setShowEmailForm] = useState(false);
    const handleShowEmailFormClose = () => setShowEmailForm(false);
    console.log(currentDay)
    console.log(data["surveyResults"])
    const isFilled = data["user"][googleUser.uid]["surveyResults"] ? data["user"][googleUser.uid]["surveyResults"][currentDay - 1] !== undefined : false;
    console.log("isfilled", isFilled);
    const showPopupAlert = () => {
        swal({
            title: "Do you want to resubmit your survey?",
            text: "You have already filled in the survey today!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willresubmit) => {
                if (willresubmit) {
                    setPage("survey")
                }
            });
    }

    return (
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: 'center', p: 2 }}>
            <Button onClick={() => { setPage("home"); setZoom(false); }}>
                <HomeIcon sx={IconStyle} />
            </Button>
            <Button onClick={() => setShowEmailForm(true)} style={{ marginLeft: "5rem" }}>
                <EmailIcon sx={IconStyle} />
            </Button>
            <MailTo toEmail={doctorEmail} show={showEmailForm} handleClose={handleShowEmailFormClose} user={user} />
            <Button onClick={() => isFilled ? showPopupAlert() : setPage("survey")} style={{ marginLeft: "5rem" }}>
                <FactCheckIcon sx={IconStyle} />
            </Button>
            <Button onClick={() => setPage("playVideo")} style={{ marginLeft: "5rem" }}>
                <PlayCircleFilledWhiteIcon sx={IconStyle} />
            </Button>
        </AppBar>
    )
}

export default NavBar;