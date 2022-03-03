import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import EmailIcon from '@mui/icons-material/Email';
import Button from '@mui/material/Button';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import MailTo from './emailWidget';
import swal from 'sweetalert';
import useStore from '../Store';

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



const NavBar = ({ data, currentDay, googleUser, setPage, user, setZoom, surveyCheck, isMobile }) => {
    const doctorEmail = data["user"][user.doctorId]["email"];
    const [showEmailForm, setShowEmailForm] = useState(false);
    const handleShowEmailFormClose = () => setShowEmailForm(false);
    const page = useStore(state => state.UserPage);

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
        <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0, background: '#b43434', flexDirection: 'row', justifyContent: isMobile ? 'space-between' : "center", p: 2 }}>
            <Button onClick={() => { setPage("home"); setZoom(false); }}>
                <HomeIcon sx={IconStyle} style={{ marginLeft: isMobile ? "2rem" : "5rem" }} />
            </Button>
            <Button onClick={() => setShowEmailForm(true)} >
                <EmailIcon sx={IconStyle} style={{ marginLeft: isMobile ? "0" : "5rem" }} />
            </Button>
            <MailTo toEmail={doctorEmail} show={showEmailForm} handleClose={handleShowEmailFormClose} user={user} />
            {page !== "survey" ? <div> <Button Button onClick={() => surveyCheck ? showPopupAlert() : setPage("survey")} >
                <FactCheckIcon sx={IconStyle} style={{ marginLeft: isMobile ? "0" : "5rem" }} />
            </Button></div> : null}
            <Button onClick={() => setPage("playVideo")} >
                <PlayCircleFilledWhiteIcon sx={IconStyle} style={isMobile ? { marginRight: "2rem" } : { marginLeft: "5rem" }} />
            </Button>
        </AppBar>
    )
}

export default NavBar;